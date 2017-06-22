/* The parameters which were combined (separated by +) were splited in code by
   the character "+".

   Due to this code, it wasn't possible to search for a language with character "+" in its name,
   like c++.

   That way, I added the dependency inside the project and made the modification to use the
   character "|".
*/
const GithubClient = require('../vendor/node-github/lib/');
const Promise = require('bluebird');
const debug = require('debug')('most-ranked-devs');
const constants = require('./constants');
const _ = require('lodash');

const github = new GithubClient({
  debug: process.env.DEBUG || false,
  Promise,
});

if (process.env.GITHUB_OAUTH_TOKEN) {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_OAUTH_TOKEN,
  });
}

/* module.exports.searchUsers = async function searchUsers(props) {
  const language = `language:${props[constants.LANGUAGE]}`;
  const location = `location:${props[constants.CITY]}`;
  const users = await github.search.users({
    q: `${language}|${location}`,
    sort: 'repositories',
    order: 'desc',
    per_page: 100,
  });
  return users;
};*/

module.exports.searchUsers = async function searchUsers(props, page = 1) {
  try {
    const language = `language:${props[constants.LANGUAGE]}`;
    const location = `location:${props[constants.CITY]}`;
    const users = await github.search.users({
      q: `${language}|${location}`,
      sort: 'repositories',
      order: 'desc',
      per_page: 100,
      page,
    });
    if (users.meta.link && users.meta.link.indexOf('next') !== -1) {
      const nextPage = users.meta.link.split(',')[0].match(/&page=([0-9])/)[1];
      const nextUsers = await searchUsers(props, nextPage);
      const allUsers = Object.assign({}, users);
      allUsers.data.items = [...allUsers.data.items, ...nextUsers.data.items];
      return allUsers;
    }
    return users;
  } catch (error) {
    console.error(error);
    debug('Error fetching users from city %s, language %d, page %s', props.city, props.language, page);
    return [];
  }
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
      const nextPage = repos.meta.link.split(',')[0].match(/&page=([0-9])/)[1];
      const nextRepos = await getReposByUser(user, nextPage);
      if (!_.isArray(nextRepos)) {
        return [...repos.data, ...nextRepos.data];
      }
      return [...repos.data, ...nextRepos];
    }
    return repos.data;
  } catch (error) {
    console.error(error);
    debug('Error fetching repos data from user %s, page %s', user.login, page);
    return [];
  }
};
