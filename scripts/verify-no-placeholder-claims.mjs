import { paths, html } from './verify-lib.mjs';
const forbidden=[
  /sub-?12ms/i,
  /sub-?15ms/i,
  /SOC\s*2(?![^<]{0,80}does not claim)/i,
  /ISO(?:\/IEC)?\s*\d{3,}/i,
  /99\.\d+%\s*uptime/i,
  /mcpserver-v1\.0\.0-gateway/i,
  /https:\/\/api\.mcpserver\.in/i,
  /₹\s*(?:999|2,999|2999)/i,
  /100,000\s+tool executions/i,
  /1,000,000\s+tool executions/i,
  /Bengaluru.*(?:office|address|HSR)/i,
  /Mumbai.*(?:latency|edge).*\d+\s*ms/i
];
for(const path of paths){
  const markup=html(path);
  for(const pattern of forbidden){
    if(pattern.test(markup)) throw new Error(`${path}: blocked unsupported claim matched ${pattern}`);
  }
}
console.log(`verify-no-placeholder-claims: ${paths.length} routes clear`);
