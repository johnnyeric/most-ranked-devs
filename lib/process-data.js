const debug = require('debug')('most-ranked-devs');
const fetchGithubData = require('./fetch-github-data');
const Promise = require('bluebird');
const Progress = require('cli-progress');

const bar = new Progress.Bar({ clearOnComplete: true }, Progress.Presets.shades_classic);

const process = async function process(props) {
  const users = await fetchGithubData.searchUsers(props);
  bar.start(users.data.total_count < 100 ? users.data.total_count : 100, 0);

  return Promise.map(users.data.items, async (user) => {
    let starsCount = 0;
    let repos = await fetchGithubData.getReposByUser({ login: user.login });
    repos = repos.filter(repo => (
      repo.language &&
        repo.language.toLowerCase() === props.language.toLowerCase()
    ));
    debug('Repos per user per specific technology %d', repos.length);
    starsCount = repos.length && repos.reduce((a, b) => a + b.stargazers_count, 0);
    bar.increment(1);
    return Object.assign({}, user, { repos, starsCount });
  });
};

const stopProgress = function stopProgress() {
  bar.stop();
};

module.exports = { process, stopProgress };
