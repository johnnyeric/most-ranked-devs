#!/usr/bin/env node

require('dotenv').config();
const program = require('commander');
const Main = require('../lib/');
const chalk = require('chalk');

let city;

program
  .version('1.0.0')
  .description(`Application to find n most highly ranked developers by city
    -If no city is informed it will use default <Ulm>
    -If no number is informed it will use default <3>
    -If no language is informed it will use default <JavaScript>

    It's advised to define .env file with GITHUB_OAUTH_TOKEN property to increase API limit
  `)
  .arguments('<city>')
  .action((c) => { city = c; })
  .option('-n, --number [number]', 'Select number for top users')
  .option('-l, --language [language]', 'Select an alternative programming language')
  .parse(process.argv);

const main = new Main();
const props = main.extract(Object.assign({}, program, { city }));

if (!process.env.GITHUB_OAUTH_TOKEN) {
  console.warn(chalk.yellow('Please setup GITHUB_OAUTH_TOKEN token in .env file to increase Github API limits'));
}

console.log('City: %s', props.city);
console.log('Language: %s', props.language);
console.log('Number: %i', props.number);
main.rank(props)
  .then(rankedUsers => main.print(rankedUsers))
  .catch(error => console.error(error));
