const fs = require('fs');

const VOCAB = {
  glossary: [
    "tool","resource","prompt","sampling","transport","stdio","http","websocket",
    "sse","json-rpc","client","server","host","capability","schema","uri",
    "method","params","result","error","notification","request","response",
    "initialize","initialized","shutdown","exit","ping","pong","cancel",
    "progress","logging","completion","roots","list","call","read","get",
    "subscribe","unsubscribe","template","argument","variable","metadata",
    "annotation","mime","encoding","compression","cache","ttl","etag",
    "version","protocol","specification","implementation","registry","directory",
    "discovery","search","filter","sort","paginate","cursor","limit","offset",
    "aggregate","transform","map","bind","scope","context","session","token",
    "authentication","authorization","oauth2","oidc","jwt","api-key","mtls",
    "tls","certificate","encryption","signing","hashing","checksum","nonce",
    "timestamp","idempotency","retry","backoff","timeout","deadline","throttle",
    "rate-limit","quota","budget","cost","metric","log","trace","span",
    "monitor","alert","audit","compliance","policy","permission","role",
    "sandbox","isolation","lifecycle","deploy","rollback","migrate","upgrade",
    "compatibility","interop","standard","conformance","validation","parse",
    "serialize","deserialize","encode","decode","compress","decompress",
    "stream","batch","chunk","buffer","queue","stack","heap","pool",
    "connection","socket","port","endpoint","url","uri","urn","path",
    "query","header","body","status","code","message","reason","detail",
    "debug","info","warn","fatal","trace","silent"
  ],
  topics: [
    "transport","security","performance","scalability","reliability",
    "observability","testing","debugging","deployment","migration",
    "integration","orchestration","composition","chaining","parallelism",
    "batching","streaming","caching","pagination","filtering","sorting",
    "aggregation","transformation","validation","serialization","compression",
    "encryption","authentication","authorization","auditing","logging",
    "monitoring","alerting","tracing","metrics","profiling","benchmarking",
    "load-balancing","failover","redundancy","disaster-recovery","backup",
    "restore","replication","sharding","partitioning","indexing","search",
    "discovery","registration","deregistration","health-check","heartbeat",
    "keepalive","timeout","retry","backoff","circuit-breaker","bulkhead",
    "rate-limiting","throttling","quota-management","cost-optimization",
    "latency-optimization","throughput-optimization","resource-management",
    "connection-pooling","thread-pooling","async","sync","concurrent",
    "parallel","distributed","microservices","monolith","serverless",
    "container","kubernetes","docker","ci-cd","gitops","infrastructure",
    "configuration","environment","secret","vault","key-management",
    "certificate-management","identity","federation","sso","mfa","passwordless",
    "biometric","hardware-key","fido2","webauthn","passkey"
  ],
  pillars: [
    "architecture","design","patterns","principles","practices",
    "governance","compliance","security","privacy","trust",
    "transparency","accountability","ethics","resilience","sustainability",
    "performance","efficiency","reliability","availability","durability",
    "consistency","partition-tolerance","scalability","elasticity",
    "portability","interoperability","extensibility","modularity",
    "composability","reusability","maintainability","testability",
    "observability","manageability","deployability","operability",
    "supportability","documentability","learnability","accessibility",
    "usability","adoption","community","ecosystem","standardization",
    "innovation","evolution","compatibility","migration","modernization",
    "transformation","automation","optimization","acceleration","enablement",
    "empowerment","collaboration","coordination","orchestration","integration"
  ],
  comparison: [
    "rest","graphql","grpc","websocket","sse","soap","xml-rpc",
    "json-rpc","openapi","asyncapi","protobuf","avro","thrift",
    "mqtt","amqp","kafka","nats","zeromq","redis","rabbitmq",
    "activemq","pulsar","kinesis","pubsub","eventbridge","eventgrid",
    "service-bus","queue","topic","stream","batch","etl","elt",
    "api-gateway","service-mesh","sidecar","ambassador","envoy",
    "nginx","haproxy","traefik","istio","linkerd","consul",
    "etcd","zookeeper","eureka","nacos","kubernetes","docker",
    "podman","containerd","cri-o","helm","kustomize","terraform",
    "pulumi","ansible","puppet","chef","salt","cloudformation",
    "cdk","sam","serverless-framework","vercel","netlify","cloudflare-workers"
  ]
};

const GLOSSARY_TEMPLATES = [
  "In the Model Context Protocol, {term} defines the mechanism by which {action}. This is fundamental to {outcome}.",
  "The concept of {term} in MCP enables developers to {action}, ensuring {outcome} across client-server interactions.",
  "MCP specifies {term} as the standard approach for {action}, providing a consistent interface for {outcome}.",
  "Understanding {term} is essential for MCP implementation: it governs how {action} while maintaining {outcome}.",
  "The {term} primitive in the Model Context Protocol handles {action}, forming a core building block for {outcome}."
];

const TOPIC_TEMPLATES = [
  "Exploring how {term} shapes modern MCP deployments, from {context} to production-grade {outcome}.",
  "A comprehensive examination of {term} within MCP ecosystems, covering {context} and its impact on {outcome}.",
  "Best practices for implementing {term} in MCP-based architectures, with focus on {context} and {outcome}.",
  "How {term} influences MCP server design, affecting {context} and ultimately determining {outcome}.",
  "Deep dive into {term}: its significance for MCP practitioners concerned with {context} and {outcome}."
];

const PILLAR_TEMPLATES = [
  "The foundational principle of {term} underpins all MCP implementations, ensuring {outcome} through disciplined {context}.",
  "{term} represents a non-negotiable pillar of MCP architecture, governing how systems achieve {outcome} via {context}.",
  "At its core, MCP relies on {term} to guarantee {outcome}, making {context} a first-class concern.",
  "The {term} pillar establishes the baseline for MCP interoperability, requiring rigorous attention to {context} and {outcome}.",
  "Without {term}, MCP cannot deliver on its promise; this pillar ensures {outcome} through systematic {context}."
];

const COMPARISON_TEMPLATES = [
  "Where {alternative} emphasizes {alt_strength}, MCP prioritizes {mcp_strength}, resulting in different approaches to {dimension}.",
  "While {alternative} offers {alt_advantage}, MCP provides {mcp_advantage}, particularly when {dimension} is critical.",
  "Choosing between {alternative} and MCP often hinges on {dimension}: {alternative} excels at {alt_capability} while MCP dominates {mcp_capability}.",
  "In the landscape of {dimension}, {alternative} and MCP represent distinct philosophies: {alt_philosophy} versus {mcp_philosophy}.",
  "Comparing {alternative} with MCP reveals trade-offs in {dimension}, where {alternative} favors {alt_approach} and MCP favors {mcp_approach}."
];

const GLOSSARY_ACTIONS = [
  "clients discover and invoke server capabilities","servers expose typed interfaces to clients",
  "requests and responses are serialized","capabilities are negotiated at handshake",
  "errors are propagated across transport boundaries","progress is reported for long-running operations",
  "resources are identified and retrieved","prompts are parameterized and executed",
  "sampling requests are routed to language models","subscriptions manage stateful connections",
  "context is maintained across multiple exchanges","schemas validate payload structure",
  "extensions augment base protocol functionality","notifications enable server-push semantics"
];

const GLOSSARY_OUTCOMES = [
  "interoperability between diverse implementations","predictable client-server contracts",
  "robust error handling across transports","efficient resource utilization",
  "consistent developer experience","secure capability negotiation",
  "scalable AI-agent architectures","reliable tool execution semantics",
  "standardized prompt management","transparent progress reporting",
  "type-safe schema validation","extensible protocol evolution"
];

const modifiers = ["advanced","essential","practical","strategic","modern","core","foundational","scalable","secure","optimized","robust","flexible","standardized","modular","distributed","integrated","automated","observable","resilient","adaptive"];

function makeDescription(term, category) {
  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  };

  const t = term.replace(/-/g, ' ');
  const h = hash(term);

  if (category === 'glossary') {
    const template = GLOSSARY_TEMPLATES[h % GLOSSARY_TEMPLATES.length];
    const action = GLOSSARY_ACTIONS[hash(term + 'a') % GLOSSARY_ACTIONS.length];
    const outcome = GLOSSARY_OUTCOMES[hash(term + 'o') % GLOSSARY_OUTCOMES.length];
    return template.replace('{term}', t).replace('{action}', action).replace('{outcome}', outcome);
  } else if (category === 'topics') {
    const template = TOPIC_TEMPLATES[h % TOPIC_TEMPLATES.length];
    const contexts = ["local development","production deployment","multi-server orchestration","security hardening","performance tuning","cross-team collaboration","compliance auditing","disaster recovery","cost optimization","scalability planning"];
    const outcomes = ["system reliability","developer productivity","operational excellence","security posture","cost efficiency","time-to-market","user satisfaction","compliance adherence","innovation velocity","technical debt reduction"];
    const context = contexts[hash(term + 'c') % contexts.length];
    const outcome = outcomes[hash(term + 'o') % outcomes.length];
    return template.replace('{term}', t).replace('{context}', context).replace('{outcome}', outcome);
  } else if (category === 'pillars') {
    const template = PILLAR_TEMPLATES[h % PILLAR_TEMPLATES.length];
    const contexts = ["transparent governance","rigorous testing","continuous monitoring","community feedback","specification review","security auditing","performance benchmarking","compliance verification","documentation quality","backward compatibility"];
    const outcomes = ["trustworthy AI systems","sustainable ecosystem growth","enterprise adoption","developer confidence","interoperability at scale","resilient infrastructure","ethical AI deployment","regulatory compliance","innovation with guardrails","long-term viability"];
    const context = contexts[hash(term + 'c') % contexts.length];
    const outcome = outcomes[hash(term + 'o') % outcomes.length];
    return template.replace('{term}', t).replace('{context}', context).replace('{outcome}', outcome);
  } else {
    const template = COMPARISON_TEMPLATES[h % COMPARISON_TEMPLATES.length];
    const dimensions = ["transport efficiency","schema expressiveness","ecosystem maturity","developer ergonomics","security model","scalability characteristics","interoperability scope","tooling support","learning curve","operational complexity","community momentum","enterprise readiness","specification stability","extensibility mechanisms","adoption barriers"];
    const altStrengths = ["established tooling","broad adoption","mature ecosystem","proven patterns","extensive documentation","vendor support","legacy integration","performance optimization","flexible deployment","granular control"];
    const mcpStrengths = ["AI-native design","unified tool interface","standardized discovery","modern transport","developer experience","extensible schema","client-server decoupling","capability negotiation","type safety","future-proof architecture"];
    const dimension = dimensions[hash(term + 'd') % dimensions.length];
    const altStrength = altStrengths[hash(term + 'a') % altStrengths.length];
    const mcpStrength = mcpStrengths[hash(term + 'm') % mcpStrengths.length];
    const alternative = term.toUpperCase();
    return template
      .replace('{alternative}', alternative)
      .replace('{dimension}', dimension)
      .replace('{alt_strength}', altStrength)
      .replace('{mcp_strength}', mcpStrength)
      .replace('{alt_advantage}', altStrength.toLowerCase())
      .replace('{mcp_advantage}', mcpStrength.toLowerCase())
      .replace('{alt_capability}', altStrength.toLowerCase())
      .replace('{mcp_capability}', mcpStrength.toLowerCase());
  }
}

function generateEntries(termList, category, prefix) {
  const seen = new Set();
  const entries = [];
  let idx = 0;
  while (entries.length < termList.length) {
    const term = termList[idx % termList.length];
    const modIdx = idx / termList.length | 0;
    let slug, title;
    if (modIdx > 0) {
      const mod = modifiers[modIdx % modifiers.length];
      slug = `${prefix}-${mod}-${term}`;
      title = `${mod.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} ${term.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`;
    } else {
      slug = `${prefix}-${term}`;
      title = term.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
    if (seen.has(slug)) {
      idx++;
      continue;
    }
    seen.add(slug);
    const description = makeDescription(term, category);
    entries.push(`{ slug:'${slug}', title:'${title}', description:'${description}' }`);
    idx++;
  }
  return entries;
}

const glossaryEntries = generateEntries(VOCAB.glossary, 'glossary', 'glossary');
const topicsEntries = generateEntries(VOCAB.topics, 'topics', 'topics');
const pillarsEntries = generateEntries(VOCAB.pillars, 'pillars', 'pillars');
const comparisonsEntries = generateEntries(VOCAB.comparison, 'comparison', 'compare');

let content = fs.readFileSync('/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_399c457e-2b06-4148-9820-80cad0f7ea71/lib/site.js', 'utf8');

function replaceArray(content, name, entries) {
  const pattern = new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`);
  const newArray = `const ${name} = [\n  ' + ',\n  '.join(entries) + '\n];`;
  return content.replace(pattern, `const ${name} = [\n  ` + entries.join(`,\n  `) + `\n];`);
}

content = replaceArray(content, 'pillars', pillarsEntries);
content = replaceArray(content, 'topics', topicsEntries);
content = replaceArray(content, 'glossary', glossaryEntries);
content = replaceArray(content, 'comparisons', comparisonsEntries);

fs.writeFileSync('/workspace/63b72ac8-352e-4e5b-b366-7b9bdabc09e7/sessions/agent_399c457e-2b06-4148-9820-80cad0f7ea71/lib/site.js', content);

console.log(`Glossary entries: ${glossaryEntries.length}`);
console.log(`Topics entries: ${topicsEntries.length}`);
console.log(`Pillars entries: ${pillarsEntries.length}`);
console.log(`Comparisons entries: ${comparisonsEntries.length}`);
console.log(`Total taxonomy entries: ${glossaryEntries.length + topicsEntries.length + pillarsEntries.length + comparisonsEntries.length}`);
console.log(`Estimated total URLs: ${glossaryEntries.length + topicsEntries.length + pillarsEntries.length + comparisonsEntries.length + 54}`);
