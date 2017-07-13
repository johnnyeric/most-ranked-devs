const debug = require('debug')('most-ranked-devs');
const fetchGithubData = require('./fetch-github-data');
const Promise = require('bluebird');
const Progress = require('cli-progress');

const bar = new Progress.Bar({ clearOnComplete: true }, Progress.Presets.shades_classic);

/*const process = async function process(props) {
  const users = await fetchGithubData.searchUsers(props);
  bar.start(users.data.total_count || 100);

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
};*/


const process = async function process(props) {
  const users = await fetchGithubData.searchUsers(props);
  bar.start(users.data.total_count || 100);

  return Promise.map(users.data.items, async (user) => {
    let starsCount = 0;
    let bytesCount = 0;
    let repos = await fetchGithubData.getReposByUser({ login: user.login });
    repos = repos.filter(repo => (
      repo.language &&
        repo.language.toLowerCase() === props.language.toLowerCase()
    ));
    debug('Repos per user per specific technology %d', repos.length);
    //console.log('repos length', repos.length);
    /* repos = await Promise.map(repos, async (repo) => {
      const languages = await fetchGithubData.getLanguageBytesByRepo(repo);
      //console.log(languages);
      return Object.assign({}, repo, { bytes: languages[props.language] || 0});
    }); */
    /*repos = await Promise.all(repos.map(async (repo) => {
      const languages = await fetchGithubData.getLanguageBytesByRepo(repo);
      //console.log(languages);
      return Object.assign({}, repo, { bytes: languages[props.language] || 0});
    }));*/
    //console.log('rlen',repos.length);
    // console.log('repos', repos);
    starsCount = repos.length && repos.reduce((a, b) => a + b.stargazers_count, 0);
    //bytesCount = repos.length && repos.reduce((a, b) => a + b.bytes, 0);
    bar.increment(1);
    return Object.assign({}, user, { repos, starsCount });
    //return Object.assign({}, user, { repos, starsCount, bytesCount });
  });
};

const stopProgress = function stopProgress() {
  bar.stop();
};

module.exports = { process, stopProgress };

/* example working
async function fetch() {
	let repos = [{name: 'repo1'}, {name: 'repo2'}]
	let r = await Promise.all(repos.map(async (repo) => {
      const languages = await {javascript: 10};
      //console.log(languages);
      return Object.assign({}, repo, { bytes: languages['javascript'] || 0});
    }));
	console.log(r);
}
*/