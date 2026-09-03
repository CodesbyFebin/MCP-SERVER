# MCPserver.in — GitHub Authority & Evidence Ledger Architecture Plan

## Goal
Establish MCPServer.in as the canonical MCP ecosystem directory, documentation, and discovery platform by:
1. Auditing the current repository to confirm its nature (directory vs. server implementation)
2. Implementing the Evidence Ledger publication authority
3. Building the GitHub authority surfaces (README, docs, Pages, Wiki, community)
4. Incorporating engineering discipline (CI, security, testing, release gates)
5. Maintaining the frozen release chain integrity (new SHA for new work)

## Key Architectural Principles
- **Use Prompt 1 as the master**: directory, documentation, ecosystem platform
- **Incorporate engineering discipline from Prompt 2**: security, CI, testing, release gates, evidence-certification
- **Do NOT impose MCP protocol runtime requirements** unless the repository actually implements an MCP server (tools/list, tools/call, resources/read, prompts/get)
- **Evidence-backed claims only**: no fake metrics, no fake adoption, no fake certifications
- **Existing frozen release candidate ≠ new GitHub-authority upgrade**: new SHA required for new work

## Target Architecture

```text
MCPServer.in
├── EVIDENCE DIRECTORY
│   ├── /servers/
│   ├── Categories
│   ├── Search
│   ├── Integrations
│   ├── Clients
├── KNOWLEDGE HUB
│   ├── Docs / Learn
│   ├── Security
│   ├── Tutorials
│   ├── Glossary
│   ├── Research
└── Evidence Ledger (Publication Authority)
    ├── Website
    ├── APIs (JSON)
    ├── AI feeds (llms/sitemap)
    └── GitHub (README, Docs, Community)
```

**Content layering (do not duplicate)**:
```text
MCPserver.in     → canonical public product + Evidence Ledger
GitHub README    → project overview + Quick Start + architecture
/docs in repo    → canonical technical documentation source
GitHub Pages     → rendered/polished version of repository docs
Wiki             → operational/community knowledge only when useful
GitHub           → contribution + development + releases
```

## Tasks

### 1. Repository Audit (READ-ONLY)
- Inspect `lib/site.js`, `src/data/servers.mjs`, `src/lib/indexability.mjs`
- Determine: does this repository implement an MCP protocol server (tools/list, tools/call, resources/read, prompts/get)?
- Confirm: it is a directory/ecosystem platform, not a server runtime
- Identify: current release chain, frozen SHA, existing production gate
- Output: `reports/github-authority-audit.md`

### 2. Evidence Ledger Publication Authority
- Verify `isContentIndexable()` and `isServerIndexable()` gates
- Confirm publication cohort from `SAFE_DEEP_REPORT.json`
- Generate machine-readable feeds: `/api/servers.json`, `/mcp-registry.json`, `sitemap.xml`, `llms.txt`, `llms-full.txt`
- Ensure all claims are evidence-backed
- Output: `reports/evidence-ledger-publication-cohort.md`

### 3. GitHub Authority Surfaces
- **README.md**: project overview, Quick Start, architecture diagram, Evidence Ledger badge, canonical link to mcpserver.in
- **/docs/**: canonical technical documentation source (architecture, verification methodology, editorial policy)
- **GitHub Pages**: rendered/polished version of /docs/
- **Wiki**: operational/community knowledge (FAQ, troubleshooting, community guides)
- **Community files**: CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, governance docs
- **Server submission workflow**: clear process for adding servers to the directory
- **Social preview**: GitHub social preview image
- **Repository topics & metadata**: MCP, model-context-protocol, directory, registry, etc.
- **White-hat discoverability**: canonical, robots, sitemap, JSON-LD, llms.txt

### 4. Engineering Discipline (from Prompt 2)
- CI gates: `npm run typecheck && npm test && npm run build:redirects && npm run build && npm run verify:all`
- Security: CodeQL, secret scanning, dependency scanning
- Release reproducibility: deterministic builds
- Configuration validation: `vercel.json` integrity
- Examples that really execute: working code samples in docs
- Performance measurements: Core Web Vitals tracking
- Accessibility: WCAG compliance
- Structured logging: consistent log format
- Health/readiness: `/status` endpoint

### 5. Quality Tests
- **UTILITY TEST**: does each page serve a clear purpose?
- **UNIQUENESS TEST**: no duplicate content across surfaces
- **EVIDENCE TEST**: every claim has a source
- **INTERNAL-LINK TEST**: no orphan pages, no broken links
- **CANONICAL TEST**: canonical URLs match, no redirect aliases
- **CONTENT-QUALITY TEST**: no fabricated metrics, no fake adoption

### 6. Release Chain Integrity
- Identify current frozen release SHA
- Create new branch for GitHub-authority work
- Ensure new SHA has new gates and new staging evidence
- Do not modify or invalidate the frozen release candidate
- Document the new release chain in `reports/release-chain-integrity-report.md`

## Output Files
- `reports/github-authority-audit.md` — repository nature confirmation
- `reports/evidence-ledger-publication-cohort.md` — publication authority status
- `reports/release-chain-integrity-report.md` — release chain status
- `README.md` — updated GitHub README
- `/docs/` — canonical technical documentation
- GitHub Pages configuration
- Wiki content structure
- Community files (CONTRIBUTING.md, SECURITY.md, etc.)

## Constraints
- READ-ONLY on frozen release chain
- Evidence-backed claims only (no fake metrics, no fake adoption)
- No duplicate content across GitHub, Wiki, Pages, website
- Use existing repository architecture (Next.js/Node.js), don't rewrite
- Maintain `isContentIndexable()` and `isServerIndexable()` as publication gates
- New SHA for any code/docs change
- MCP runtime requirements only if repository actually implements them

## Pass Rule
- Repository audit confirms directory/ecosystem nature (not MCP server implementation)
- Evidence Ledger publication authority operational and gated
- GitHub authority surfaces implemented without duplicating website
- Engineering discipline integrated (CI, security, testing)
- Quality tests pass
- Release chain integrity maintained (frozen SHA preserved, new SHA for new work)
- Canonical/robots/sitemap/JSON-LD/llms.txt all present and valid
- No fabricated metrics or adoption claims
