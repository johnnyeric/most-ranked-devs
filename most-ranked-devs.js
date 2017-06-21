#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird');
const GithubClient = require('github');
const debug = require('debug')('most-ranked-devs');
const topRank = require('./lib/top_rank');

const github = new GithubClient({
  debug: false,
  Promise,
});

let city;

program
  .version('1.0.0')
  .arguments('<city>')
  .action((c) => { city = c; })
  .option('-n, --number [number]', 'Select number for top users')
  .parse(process.argv);

if (typeof city === 'undefined') {
  debug('No city was informed!');
  console.error('No city was informed!');
  process.exit(1);
}

debug('City was informed! %s', city);

