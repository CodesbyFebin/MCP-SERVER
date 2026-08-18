import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml missing');
  process.exit(1);
}
const content = fs.readFileSync(sitemapPath, 'utf-8');
if (!content.includes('<?xml') || !content.includes('<urlset')) {
  console.error('sitemap.xml invalid');
  process.exit(1);
}
console.log('Sitemap verification passed');
