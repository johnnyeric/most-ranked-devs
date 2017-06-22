const debug = require('debug')('most-ranked-devs');
const processData = require('./process-data');
const _ = require('lodash');

const rank = async function rank(props) {
  const users = await processData.process(props);
  processData.stopProgress();
  const rankedUsers = _.orderBy(users, ['starsCount'], ['desc'])
    .slice(0, props.number)
    .map(user => Object.assign({}, { login: user.login, stars: user.starsCount }));
  rankedUsers.map(user => console.log(user.login));
  debug('Users from github api: %O', users);
  debug('Ranked users: %O', rankedUsers);
};

module.exports = rank;
