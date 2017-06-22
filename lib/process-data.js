// const debug = require('debug')('most-ranked-devs');
const fetchGithubData = require('./fetch-github-data');
const Promise = require('bluebird');

const processData = async function processData(props) {
  const users = await fetchGithubData.searchUsers(props);

  return Promise.mapSeries(users.data.items, async (user) => {
    let starsCount = 0;
    let repos = await fetchGithubData.getReposByUser({ login: user.login });
    repos = repos.filter(repo => repo.language && repo.language.toLowerCase() === 'javascript');
    starsCount = repos.length && repos.reduce((a, b) => a + b.stargazers_count, 0);
    return Object.assign({}, user, { repos, starsCount });
  });
};

module.exports = processData;
