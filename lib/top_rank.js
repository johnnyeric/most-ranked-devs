const TOP_NUMBER = 3;
const GithubClient = require('github');
const Promise = require('bluebird');
const debug = require('debug')('most-ranked-devs');

const github = new GithubClient({
  debug: false,
  Promise,
});

module.exports = {};
