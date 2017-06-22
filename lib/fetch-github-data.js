const GithubClient = require('github');
const Promise = require('bluebird');
// const debug = require('debug')('most-ranked-devs');
const constants = require('./constants');
const _ = require('lodash');

const github = new GithubClient({
  debug: process.env.DEBUG || false,
  Promise,
});

github.authenticate({
  type: 'oauth',
  token: '663514d06513f6c9b7be01625f5f979a0fb130df',
});

module.exports.searchUsers = async function searchUsers(props) {
  const language = `language:${props[constants.LANGUAGE]}`;
  const location = `location:${props[constants.CITY]}`;
  const users = await github.search.users({
    q: `${language}+${location}`,
    sort: 'repositories',
    order: 'desc',
    per_page: 100,
  });
  return users;
};

module.exports.getReposByUser = async function getReposByUser(user, page = 1) {
  try {
    const repos = await github.repos.getForUser({
      username: user.login,
      direction: 'desc',
      per_page: 100,
      page,
    });
    if (repos.meta.link && repos.meta.link.indexOf('next') !== -1) {
      const nextPage = repos.meta.link.split(',')[0].match(/page=([0-9])/)[1];
      const temp = await getReposByUser(user, nextPage);
      if (!_.isArray(temp)) {
        return [...repos.data, ...temp.data];
      }
      return [...repos.data, ...temp];
    }
    return repos.data;
  } catch (error) {
    console.error(error);
  }
  return {};
};
