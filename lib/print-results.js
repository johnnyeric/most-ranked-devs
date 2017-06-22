const chalk = require('chalk');

const printResults = (rankedUsers) => {
  rankedUsers.map(user => console.log(chalk.green(user.login)));
};

module.exports = printResults;
