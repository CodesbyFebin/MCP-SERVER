import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const DATA = path.join(ROOT, 'src', 'data');
const SCRIPTS = path.join(ROOT, 'scripts');
const PUBLIC = path.join(ROOT, 'public');

const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string, extensions: string[] = ['.ts', '.tsx', '.mjs', '.js']) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '.next') {
      walk(full, extensions);
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      checkFile(full, entry.name);
    }
  }
}

function checkFile(filePath: string, fileName: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relative = path.relative(ROOT, filePath);

  // 1. Block draft-manager references in production authority
  if (relative.startsWith('src/') && !relative.includes('draft-manager')) {
    if (content.includes('draft-manager') || content.includes('createDraft') || content.includes('createSectionDraft')) {
      errors.push(`${relative}: draft-manager subsystem must not be imported into production authority`);
    }
  }

  // 2. Block apex-domain hardcoded URLs outside allowed config
  if (!relative.includes('site.ts') && !relative.includes('legacy-url-map.ts')) {
    const apexMatches = content.match(/https?:\/\/(?:mcpserver\.in|www\.mcpserver\.in)/g);
    if (apexMatches && !relative.includes('config/site.ts')) {
      warnings.push(`${relative}: hardcoded apex/www URL detected; prefer SITE.origin from config/site.ts`);
    }
  }

  // 3. Block HTTP production URLs
  const httpMatches = content.match(/http:\/\/(?:www\.)?mcpserver\.in/g);
  if (httpMatches) {
    errors.push(`${relative}: HTTP production URL detected; use HTTPS`);
  }

  // 4. Block embedded Vercel preview URLs in production code
  if (content.includes('vercel.app') && !relative.includes('verify-preview')) {
    errors.push(`${relative}: embedded Vercel preview URL detected`);
  }

  // 5. Check for banned claims
  const claimHits = scanClaims(content);
  if (claimHits.length > 0) {
    warnings.push(`${relative}: banned claim patterns: ${claimHits.join(', ')}`);
  }

  // 6. Check for fake sitemap freshness
  if (content.includes('new Date()') && relative.includes('sitemap')) {
    errors.push(`${relative}: fake sitemap freshness detected; use real updatedAt/lastReviewedAt`);
  }
}

function scanClaims(content: string): string[] {
  const BANNED_CLAIMS = [
    'sub-12ms', 'sub-15ms', 'mumbai edge', 'bengaluru edge', 'hyderabad edge',
    'soc 2', 'iso 27001', 'iso certified', 'drdp compliant', 'rbi compliant',
    '99.99% uptime', '99.9% uptime', 'guaranteed uptime', 'largest', 'number one',
    '#1', 'best in class', 'world class', 'enterprise-grade', 'award-winning',
    'trusted by thousands', 'trusted by millions', 'used by millions',
    '500k deployments', '10,000+ servers', '300k+ stars', '72-hour breach',
    '4.9/5', '150 reviews', '₹0 price',
  ];
  const lower = content.toLowerCase();
  return BANNED_CLAIMS.filter(claim => lower.includes(claim));
}

// Check for duplicate robots/sitemap implementations
const robotsFiles = [
  'public/robots.txt',
  'src/app/robots.ts',
];
const seenRobots = new Set<string>();
for (const file of robotsFiles) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) {
    if (seenRobots.has(full)) {
      errors.push(`Duplicate robots implementation: ${file}`);
    }
    seenRobots.add(full);
  }
}

// Check for recursive build ↔ production:gate in package.json
const packageJsonPath = path.join(ROOT, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const scripts = pkg.scripts || {};
  if (scripts.build && scripts.production:gate && scripts.build.includes('production:gate')) {
    errors.push('Recursive build ↔ production:gate configuration detected');
  }
}

walk(SRC);
walk(DATA);
walk(SCRIPTS);

// Check sitemap for vercel.app URLs
const sitemapPath = path.join(PUBLIC, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  if (sitemap.includes('vercel.app') || sitemap.includes('localhost')) {
    errors.push('sitemap.xml contains non-production URLs');
  }
}

if (errors.length > 0) {
  console.error('production:gate preflight FAILED:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn('production:gate preflight warnings:');
  warnings.forEach(w => console.warn(`  - ${w}`));
} else {
  console.log('production:gate preflight passed');
}
