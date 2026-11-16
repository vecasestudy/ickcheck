// Copies the app's flag list into the helper so both always agree.
// Run from the repo root: node worker/scripts/sync-flags.js
const fs = require('fs'), path = require('path');
const window = {};
new Function('window', fs.readFileSync(path.join(__dirname, '../../app/data/flags.js'), 'utf8'))(window);
const out = { lists: window.ICK_LISTS, flags: window.ICK_FLAGS.map(f => ({ name: f.name, lists: f.lists })) };
fs.writeFileSync(path.join(__dirname, '../src/flags.json'), JSON.stringify(out, null, 1) + '\n');
console.log('flags.json:', out.flags.length, 'substances');
