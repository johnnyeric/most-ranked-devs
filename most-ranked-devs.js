#!/usr/bin/env node

const program = require('commander');
const topRank = require('./lib/top_rank');

let city;

program
  .version('1.0.0')
  .arguments('<city>')
  .action((c) => { city = c; })
  .option('-n, --number [number]', 'Select number for top users')
  .parse(process.argv);

if (typeof city === 'undefined') {
  console.error('No city was informed!');
  process.exit(1);
}

console.log('City was informed! %s', city);

