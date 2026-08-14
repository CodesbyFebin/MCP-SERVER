import { paths, html } from './verify-lib.mjs';
for (const path of paths) html(path);
console.log(`verify-routes: ${paths.length} routes render`);
