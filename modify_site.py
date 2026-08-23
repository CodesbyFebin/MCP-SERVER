import sys

# Read the backup file
with open('./lib/site.js.backup', 'r') as f:
    lines = f.readlines()

# We'll modify the lines in memory
# First, insert the redirect function after the REDIRECTS line
# Find the line with "export const REDIRECTS"
for i, line in enumerate(lines):
    if line.strip().startswith("export const REDIRECTS"):
        # Insert after this line
        redirect_func = [
            "\n",
            "function isRedirectSource(path) {\n",
            "  const p = path.replace(/\/+$/, \"\");\n",
            "  const basePaths = [\n",
            "    \"/directory\",\n",
            "    \"/integrations\",\n",
            "    \"/clients\",\n",
            "    \"/docs\",\n",
            "    \"/tools/mcp-playground\",\n",
            "    \"/what-is-mcp\",\n",
            "    \"/learn\",\n",
            "    \"/security\",\n",
            "    \"/state-of-mcp\",\n",
            "    \"/blog\",\n",
            "    \"/pricing\",\n",
            "    \"/about\",\n",
            "    \"/contact\",\n",
            "    \"/research/mcp-directories\",\n",
            "    \"/status\",\n",
            "    \"/hosting\",\n",
            "    \"/editorial-policy\",\n",
            "    \"/verification-methodology\",\n",
            "    \"/privacy\",\n",
            "    \"/terms\",\n",
            "    \"/servers\",\n",
            "    \"/mcp-server-directory\"\n",
            "  ];\n",
            "  return basePaths.some(base => {\n",
            "    if (p === base) return false;\n",
            "    const baseWithSlash = base + \"/\";\n",
            "    return p.startsWith(baseWithSlash) && p.length > baseWithSlash.length;\n",
            "  });\n",
            "}\n",
            "\n"
        ]
        # Insert the redirect_func lines after line i
        lines = lines[:i+1] + redirect_func + lines[i+1:]
        break  # Assuming only one REDIRECTS line

# Now, replace the allIndexablePaths function
# Find the line with "export function allIndexablePaths"
for i, line in enumerate(lines):
    if line.strip().startswith("export function allIndexablePaths"):
        # Find the end of the function: we'll look for the line that ends with "]; }"
        j = i
        while j < len(lines):
            if lines[j].strip() == "]; }":
                break
            j += 1
        # Now j is the line with "]; }"
        # We want to replace lines[i] through lines[j] inclusive with the new function
        new_func = [
            "export function allIndexablePaths(){ \n",
            "  const paths = [\n",
            "    ...STATIC.map(r=>r.path),\n",
            "    ...serverRecords.filter(isServerIndexable).map(s=>'/servers/'+s.slug),\n",
            "    ...categoryRecords.map(c=>'/categories/'+c.slug),\n",
            "    ...pillars.map(x=>'/pillars/'+x.slug),\n",
            "    ...topics.map(x=>'/topics/'+x.slug),\n",
            "    ...glossary.map(x=>'/glossary/'+x.slug),\n",
            "    ...comparisons.map(x=>'/compare/'+x.slug)\n",
            "  ];\n",
            "  // Filter out redirect sources\n",
            "  return paths.filter(path => !isRedirectSource(path)); \n",
            "}\n"
        ]
        # Replace lines[i] to lines[j] inclusive with new_func
        lines = lines[:i] + new_func + lines[j+1:]
        break

# Write the modified lines to site.js
with open('./lib/site.js', 'w') as f:
    f.writelines(lines)
