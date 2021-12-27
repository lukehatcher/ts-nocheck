const fs = require('fs');
const shebang = '#!/usr/bin/env node';
const lines = fs.readFileSync('./dist/index.min.js', 'utf8').toString().split('\n');

if (lines[0] !== shebang) {
  lines.unshift(shebang);
  fs.writeFileSync('./dist/index.min.js', lines.join('\n'));
}
