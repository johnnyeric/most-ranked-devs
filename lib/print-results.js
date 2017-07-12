const chalk = require('chalk');

const printResults = (rankedUsers) => {
  if (rankedUsers.length === 0) {
    console.log(chalk.red('No developers found!'));
    return;
  }
  rankedUsers.map(user => console.log(chalk.green(user.login+' stars:'+user.stars+' repos:'+user.repos)));
};

module.exports = printResults;
