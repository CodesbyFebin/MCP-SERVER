import re
import random

random.seed(42)

with open('lib/site.js', 'r') as f:
    content = f.read()

# Curated MCP terminology organized by domain
VOCAB = {
    "glossary": [
        "tool", "resource", "prompt", "sampling", "transport", "stdio", "http", "websocket",
        "sse", "json-rpc", "client", "server", "host", "capability", "schema", "uri",
        "method", "params", "result", "error", "notification", "request", "response",
        "initialize", "initialized", "shutdown", "exit", "ping", "pong", "cancel",
        "progress", "logging", "completion", "roots", "list", "call", "read", "get",
        "subscribe", "unsubscribe", "template", "argument", "variable", "metadata",
        "annotation", "mime", "encoding", "compression", "cache", "ttl", "etag",
        "version", "protocol", "specification", "implementation", "registry", "directory",
        "discovery", "search", "filter", "sort", "paginate", "cursor", "limit", "offset",
        "aggregate", "transform", "map", "bind", "scope", "context", "session", "token",
        "authentication", "authorization", "oauth2", "oidc", "jwt", "api-key", "mtls",
        "tls", "certificate", "encryption", "signing", "hashing", "checksum", "nonce",
        "timestamp", "idempotency", "retry", "backoff", "timeout", "deadline", "throttle",
        "rate-limit", "quota", "budget", "cost", "metric", "log", "trace", "span",
        "monitor", "alert", "audit", "compliance", "policy", "permission", "role",
        "sandbox", "isolation", "lifecycle", "deploy", "rollback", "migrate", "upgrade",
        "compatibility", "interop", "standard", "conformance", "validation", "parse",
        "serialize", "deserialize", "encode", "decode", "compress", "decompress",
        "stream", "batch", "chunk", "buffer", "queue", "stack", "heap", "pool",
        "connection", "socket", "port", "endpoint", "url", "uri", "urn", "path",
        "query", "header", "body", "status", "code", "message", "reason", "detail",
        "debug", "info", "warn", "fatal", "trace", "silent"
    ],
    "topics": [
        "transport", "security", "performance", "scalability", "reliability",
        "observability", "testing", "debugging", "deployment", "migration",
        "integration", "orchestration", "composition", "chaining", "parallelism",
        "batching", "streaming", "caching", "pagination", "filtering", "sorting",
        "aggregation", "transformation", "validation", "serialization", "compression",
        "encryption", "authentication", "authorization", "auditing", "logging",
        "monitoring", "alerting", "tracing", "metrics", "profiling", "benchmarking",
        "load-balancing", "failover", "redundancy", "disaster-recovery", "backup",
        "restore", "replication", "sharding", "partitioning", "indexing", "search",
        "discovery", "registration", "deregistration", "health-check", "heartbeat",
        "keepalive", "timeout", "retry", "backoff", "circuit-breaker", "bulkhead",
        "rate-limiting", "throttling", "quota-management", "cost-optimization",
        "latency-optimization", "throughput-optimization", "resource-management",
        "connection-pooling", "thread-pooling", "async", "sync", "concurrent",
        "parallel", "distributed", "microservices", "monolith", "serverless",
        "container", "kubernetes", "docker", "ci-cd", "gitops", "infrastructure",
        "configuration", "environment", "secret", "vault", "key-management",
        "certificate-management", "identity", "federation", "sso", "mfa", "passwordless",
        "biometric", "hardware-key", "fido2", "webauthn", "passkey"
    ],
    "pillars": [
        "architecture", "design", "patterns", "principles", "practices",
        "governance", "compliance", "security", "privacy", "trust",
        "transparency", "accountability", "ethics", "resilience", "sustainability",
        "performance", "efficiency", "reliability", "availability", "durability",
        "consistency", "partition-tolerance", "scalability", "elasticity",
        "portability", "interoperability", "extensibility", "modularity",
        "composability", "reusability", "maintainability", "testability",
        "observability", "manageability", "deployability", "operability",
        "supportability", "documentability", "learnability", "accessibility",
        "usability", "adoption", "community", "ecosystem", "standardization",
        "innovation", "evolution", "compatibility", "migration", "modernization",
        "transformation", "automation", "optimization", "acceleration", "enablement",
        "empowerment", "collaboration", "coordination", "orchestration", "integration"
    ],
    "comparison": [
        "rest", "graphql", "grpc", "websocket", "sse", "soap", "xml-rpc",
        "json-rpc", "openapi", "asyncapi", "protobuf", "avro", "thrift",
        "mqtt", "amqp", "kafka", "nats", "zeromq", "redis", "rabbitmq",
        "activemq", "pulsar", "kinesis", "pubsub", "eventbridge", "eventgrid",
        "service-bus", "queue", "topic", "stream", "batch", "etl", "elt",
        "api-gateway", "service-mesh", "sidecar", "ambassador", "envoy",
        "nginx", "haproxy", "traefik", "istio", "linkerd", "consul",
        "etcd", "zookeeper", "eureka", "nacos", "kubernetes", "docker",
        "podman", "containerd", "cri-o", "helm", "kustomize", "terraform",
        "pulumi", "ansible", "puppet", "chef", "salt", "cloudformation",
        "cdk", "sam", "serverless-framework", "vercel", "netlify", "cloudflare-workers"
    ]
}

# Unique description templates per category - maximally varied
GLOSSARY_TEMPLATES = [
    "In the Model Context Protocol, {term} defines the mechanism by which {action}. This is fundamental to {outcome}.",
    "The concept of {term} in MCP enables developers to {action}, ensuring {outcome} across client-server interactions.",
    "MCP specifies {term} as the standard approach for {action}, providing a consistent interface for {outcome}.",
    "Understanding {term} is essential for MCP implementation: it governs how {action} while maintaining {outcome}.",
    "The {term} primitive in the Model Context Protocol handles {action}, forming a core building block for {outcome}.",
    "Within MCP architecture, {term} serves as the abstraction for {action}, enabling interoperability through {outcome}.",
    "MCP's {term} mechanism facilitates {action} in a transport-agnostic manner, supporting {outcome}.",
    "The specification of {term} in MCP addresses {action}, allowing implementations to achieve {outcome}.",
    "For MCP servers and clients, {term} represents the contract for {action}, ensuring predictable {outcome}.",
    "The role of {term} in MCP is to standardize {action}, thereby enabling {outcome} across diverse implementations.",
    "{term} in the Model Context Protocol refers to the structured approach for {action}, critical for {outcome}.",
    "MCP defines {term} to encapsulate the logic of {action}, providing a uniform method for {outcome}.",
    "The implementation of {term} in MCP ensures that {action} occurs reliably, contributing to {outcome}.",
    "As a core MCP concept, {term} orchestrates {action} to deliver {outcome} in distributed AI systems.",
    "MCP leverages {term} to abstract {action}, making it possible to achieve {outcome} across different transports."
]

TOPIC_TEMPLATES = [
    "Exploring how {term} shapes modern MCP deployments, from {context} to production-grade {outcome}.",
    "A comprehensive examination of {term} within MCP ecosystems, covering {context} and its impact on {outcome}.",
    "Best practices for implementing {term} in MCP-based architectures, with focus on {context} and {outcome}.",
    "How {term} influences MCP server design, affecting {context} and ultimately determining {outcome}.",
    "Deep dive into {term}: its significance for MCP practitioners concerned with {context} and {outcome}.",
    "The evolving landscape of {term} in MCP, analyzing {context} and pathways to achieve {outcome}.",
    "Practical strategies for {term} in MCP implementations, addressing challenges in {context} and {outcome}.",
    "Why {term} matters for MCP adoption: connecting {context} to measurable improvements in {outcome}.",
    "Architecting MCP solutions with {term} at the forefront, balancing {context} against {outcome}.",
    "The intersection of {term} and MCP: how {context} drives decisions about {outcome}.",
    "Measuring the impact of {term} on MCP system health, from {context} to {outcome}.",
    "Common pitfalls when addressing {term} in MCP, and how to navigate {context} for better {outcome}.",
    "Future directions for {term} in the MCP specification, considering {context} and emerging {outcome}.",
    "Case studies in {term} optimization for MCP, demonstrating {context} improvements and {outcome} gains.",
    "The relationship between {term} and MCP scalability, examining {context} and its effect on {outcome}."
]

PILLAR_TEMPLATES = [
    "The foundational principle of {term} underpins all MCP implementations, ensuring {outcome} through disciplined {context}.",
    "{term} represents a non-negotiable pillar of MCP architecture, governing how systems achieve {outcome} via {context}.",
    "At its core, MCP relies on {term} to guarantee {outcome}, making {context} a first-class concern.",
    "The {term} pillar establishes the baseline for MCP interoperability, requiring rigorous attention to {context} and {outcome}.",
    "Without {term}, MCP cannot deliver on its promise; this pillar ensures {outcome} through systematic {context}.",
    "MCP's commitment to {term} manifests in {outcome}, achieved by embedding {context} into every layer.",
    "The {term} principle guides MCP evolution, ensuring that {outcome} remains achievable as {context} evolves.",
    "{term} is the bedrock upon which MCP's {outcome} is built, demanding excellence in {context}.",
    "In MCP governance, {term} serves as the anchor for {outcome}, requiring transparent {context}.",
    "The durability of MCP depends on {term}, which secures {outcome} through resilient {context}.",
    "{term} defines the ethical boundaries of MCP, ensuring {outcome} aligns with {context} expectations.",
    "MCP's {term} framework establishes accountability for {outcome} through measurable {context}.",
    "The {term} commitment differentiates MCP from alternatives, delivering {outcome} via principled {context}.",
    "{term} enables MCP to scale responsibly, maintaining {outcome} while adapting {context}.",
    "Trust in MCP is earned through {term}, which guarantees {outcome} by enforcing {context}."
]

COMPARISON_TEMPLATES = [
    "Where {alternative} emphasizes {alt_strength}, MCP prioritizes {mcp_strength}, resulting in different approaches to {dimension}.",
    "While {alternative} offers {alt_advantage}, MCP provides {mcp_advantage}, particularly when {dimension} is critical.",
    "Choosing between {alternative} and MCP often hinges on {dimension}: {alternative} excels at {alt_capability} while MCP dominates {mcp_capability}.",
    "In the landscape of {dimension}, {alternative} and MCP represent distinct philosophies: {alt_philosophy} versus {mcp_philosophy}.",
    "Comparing {alternative} with MCP reveals trade-offs in {dimension}, where {alternative} favors {alt_approach} and MCP favors {mcp_approach}.",
    "For {dimension} requirements, {alternative} delivers {alt_result} whereas MCP achieves {mcp_result}, reflecting different design goals.",
    "The choice between {alternative} and MCP for {dimension} depends on whether {alt_priority} or {mcp_priority} matters more.",
    "{alternative} and MCP diverge significantly on {dimension}: the former optimizes for {alt_goal} while the latter targets {mcp_goal}.",
    "Understanding {alternative} versus MCP in the context of {dimension} clarifies why organizations choose {alt_use_case} or {mcp_use_case}.",
    "Both {alternative} and MCP address {dimension}, but through contrasting mechanisms: {alt_mechanism} versus {mcp_mechanism}.",
    "When evaluating {alternative} against MCP for {dimension}, consider {alt_factor} against {mcp_factor}.",
    "The evolution of {dimension} shows {alternative} converging with MCP on {convergence_point} while diverging on {divergence_point}.",
    "{alternative} suits scenarios where {alt_condition} applies; MCP is preferable when {mcp_condition} holds.",
    "In head-to-head comparisons for {dimension}, {alternative} wins on {alt_metric} but MCP leads on {mcp_metric}.",
    "The ecosystem around {alternative} emphasizes {alt_focus}, whereas MCP's ecosystem centers on {mcp_focus}."
]

GLOSSARY_ACTIONS = [
    "clients discover and invoke server capabilities", "servers expose typed interfaces to clients",
    "requests and responses are serialized", "capabilities are negotiated at handshake",
    "errors are propagated across transport boundaries", "progress is reported for long-running operations",
    "resources are identified and retrieved", "prompts are parameterized and executed",
    "sampling requests are routed to language models", "subscriptions manage stateful connections",
    "context is maintained across multiple exchanges", "schemas validate payload structure",
    "extensions augment base protocol functionality", "notifications enable server-push semantics"
]

GLOSSARY_OUTCOMES = [
    "interoperability between diverse implementations", "predictable client-server contracts",
    "robust error handling across transports", "efficient resource utilization",
    "consistent developer experience", "secure capability negotiation",
    "scalable AI-agent architectures", "reliable tool execution semantics",
    "standardized prompt management", "transparent progress reporting",
    "type-safe schema validation", "extensible protocol evolution"
]

def make_glossary(term):
    template = GLOSSARY_TEMPLATES[hash(term) % len(GLOSSARY_TEMPLATES)]
    action = GLOSSARY_ACTIONS[hash(term+"a") % len(GLOSSARY_ACTIONS)]
    outcome = GLOSSARY_OUTCOMES[hash(term+"o") % len(GLOSSARY_OUTCOMES)]
    description = template.format(term=term.replace("-", " "), action=action, outcome=outcome)
    return description

def make_topic(term):
    template = TOPIC_TEMPLATES[hash(term) % len(TOPIC_TEMPLATES)]
    contexts = ["local development", "production deployment", "multi-server orchestration", "security hardening", "performance tuning", "cross-team collaboration", "compliance auditing", "disaster recovery", "cost optimization", "scalability planning"]
    outcomes = ["system reliability", "developer productivity", "operational excellence", "security posture", "cost efficiency", "time-to-market", "user satisfaction", "compliance adherence", "innovation velocity", "technical debt reduction"]
    context = contexts[hash(term+"c") % len(contexts)]
    outcome = outcomes[hash(term+"o") % len(outcomes)]
    description = template.format(term=term.replace("-", " "), context=context, outcome=outcome)
    return description

def make_pillar(term):
    template = PILLAR_TEMPLATES[hash(term) % len(PILLAR_TEMPLATES)]
    contexts = ["transparent governance", "rigorous testing", "continuous monitoring", "community feedback", "specification review", "security auditing", "performance benchmarking", "compliance verification", "documentation quality", "backward compatibility"]
    outcomes = ["trustworthy AI systems", "sustainable ecosystem growth", "enterprise adoption", "developer confidence", "interoperability at scale", "resilient infrastructure", "ethical AI deployment", "regulatory compliance", "innovation with guardrails", "long-term viability"]
    context = contexts[hash(term+"c") % len(contexts)]
    outcome = outcomes[hash(term+"o") % len(outcomes)]
    description = template.format(term=term.replace("-", " "), context=context, outcome=outcome)
    return description

def make_comparison(term):
    template = COMPARISON_TEMPLATES[hash(term) % len(COMPARISON_TEMPLATES)]
    dimensions = ["transport efficiency", "schema expressiveness", "ecosystem maturity", "developer ergonomics", "security model", "scalability characteristics", "interoperability scope", "tooling support", "learning curve", "operational complexity", "community momentum", "enterprise readiness", "specification stability", "extensibility mechanisms", "adoption barriers"]
    alt_strengths = ["established tooling", "broad adoption", "mature ecosystem", "proven patterns", "extensive documentation", "vendor support", "legacy integration", "performance optimization", "flexible deployment", "granular control"]
    mcp_strengths = ["AI-native design", "unified tool interface", "standardized discovery", "modern transport", "developer experience", "extensible schema", "client-server decoupling", "capability negotiation", "type safety", "future-proof architecture"]
    dimension = dimensions[hash(term+"d") % len(dimensions)]
    alt_strength = alt_strengths[hash(term+"a") % len(alt_strengths)]
    mcp_strength = mcp_strengths[hash(term+"m") % len(mcp_strengths)]
    description = template.format(
        alternative=term.upper() if term.upper() in ["REST", "gRPC", "GraphQL", "SOAP"] else term.replace("-", " ").title(),
        dimension=dimension,
        alt_strength=alt_strength,
        mcp_strength=mcp_strength,
        alt_advantage=alt_strength.lower(),
        mcp_advantage=mcp_strength.lower(),
        alt_capability=alt_strength.lower(),
        mcp_capability=mcp_strength.lower(),
        alt_philosophy="established conventions",
        mcp_philosophy="AI-first design",
        alt_approach="proven patterns",
        mcp_approach="modern abstractions",
        alt_result="rapid integration",
        mcp_result="long-term flexibility",
        alt_priority="immediate compatibility",
        mcp_priority="future scalability",
        alt_goal="stability",
        mcp_goal="innovation",
        alt_use_case="legacy modernization",
        mcp_use_case="greenfield AI systems",
        alt_mechanism="fixed contracts",
        mcp_mechanism="negotiated capabilities",
        alt_factor="ecosystem size",
        mcp_factor="AI-native features",
        convergence_point="developer experience",
        divergence_point="AI-agent integration",
        alt_condition="existing infrastructure",
        mcp_condition="AI-first requirements",
        alt_metric="time-to-deploy",
        mcp_metric="long-term adaptability",
        alt_focus="broad compatibility",
        mcp_focus="AI-agent interoperability"
    )
    return description

def generate_entries(term_list, category, prefix):
    seen = set()
    entries = []
    idx = 0
    while len(entries) < len(term_list):
        term = term_list[idx % len(term_list)]
        mod_idx = idx // len(term_list)
        if mod_idx > 0:
            mod = modifiers[mod_idx % len(modifiers)]
            slug = f"{prefix}-{mod}-{term}"
            title = f"{mod.replace('-', ' ').title()} {term.replace('-', ' ').title()}"
        else:
            slug = f"{prefix}-{term}"
            title = term.replace("-", " ").title()

        if slug in seen:
            idx += 1
            continue
        seen.add(slug)

        if category == "glossary":
            description = make_glossary(term)
        elif category == "topics":
            description = make_topic(term)
        elif category == "pillars":
            description = make_pillar(term)
        else:
            description = make_comparison(term)

        entries.append(f"{{ slug:'{slug}', title:'{title}', description:'{description}' }}")
        idx += 1
    return entries

modifiers = ["advanced", "essential", "practical", "strategic", "modern", "core", "foundational", "scalable", "secure", "optimized", "robust", "flexible", "standardized", "modular", "distributed", "integrated", "automated", "observable", "resilient", "adaptive"]

target = 380

glossary_entries = generate_entries(VOCAB["glossary"], "glossary", "glossary")
topics_entries = generate_entries(VOCAB["topics"], "topics", "topics")
pillars_entries = generate_entries(VOCAB["pillars"], "pillars", "pillars")
comparisons_entries = generate_entries(VOCAB["comparison"], "comparison", "compare")

def replace_array(content, name, entries):
    pattern = rf"const {name} = \[([\s\S]*?)\];"
    new_array = f"const {name} = [\n  " + ",\n  ".join(entries) + "\n];"
    content = re.sub(pattern, new_array, content, count=1)
    return content

content = replace_array(content, "pillars", pillars_entries)
content = replace_array(content, "topics", topics_entries)
content = replace_array(content, "glossary", glossary_entries)
content = replace_array(content, "comparisons", comparisons_entries)

with open('lib/site.js', 'w') as f:
    f.write(content)

print(f"Glossary entries: {len(glossary_entries)}")
print(f"Topics entries: {len(topics_entries)}")
print(f"Pillars entries: {len(pillars_entries)}")
print(f"Comparisons entries: {len(comparisons_entries)}")
print(f"Total taxonomy entries: {len(glossary_entries) + len(topics_entries) + len(pillars_entries) + len(comparisons_entries)}")
print(f"Estimated total URLs: {len(glossary_entries) + len(topics_entries) + len(pillars_entries) + len(comparisons_entries) + 54}")
