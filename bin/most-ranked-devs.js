#!/usr/bin/env node

const program = require('commander');
const Main = require('../lib/');

let city;

program
  .version('1.0.0')
  .arguments('<city>')
  .action((c) => { city = c; })
  .option('-n, --number [n]', 'Select number for top users')
  .option('-l, --language [lang]', 'Select an alternative programming language')
  .parse(process.argv);

if (typeof city === 'undefined') {
  console.error('No city was informed!');
  process.exit(1);
}

console.log('City informed: %s', city);
const main = new Main();
const props = main.extract(Object.assign({}, program, { city }));
main.rank(props);
