#!/usr/bin/env node

const program = require('commander');
const Main = require('../lib/');

let city;

program
  .version('1.0.0')
  .description(`Application to find n most highly ranked developers in a city
    -If no city is informed it will use default <Ulm>
    -If no number is informed it will use default <3>
    -If no language is informed it will use default <JavaScript>
  `)
  .arguments('<city>')
  .action((c) => { city = c; })
  .option('-n, --number [number]', 'Select number for top users')
  .option('-l, --language [language]', 'Select an alternative programming language')
  .parse(process.argv);

const main = new Main();
const props = main.extract(Object.assign({}, program, { city }));
console.log('City: %s', props.city);
console.log('Language: %s', props.language);
console.log('Number: %i', props.number);
main.rank(props);
