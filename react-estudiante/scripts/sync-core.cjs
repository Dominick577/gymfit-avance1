const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../../core-js');
const target = path.resolve(__dirname, '../src/core');
fs.mkdirSync(target, { recursive: true });
for (const file of ['validadores.js', 'modelos.js', 'estadisticas.js']) {
  fs.copyFileSync(path.join(source, file), path.join(target, file));
}
console.log('core-js sincronizado en React');
