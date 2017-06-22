const printResults = (rankedUsers) => {
  rankedUsers.map(user => console.log(user.login));
};

module.exports = printResults;
