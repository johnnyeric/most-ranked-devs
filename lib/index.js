const extractProps = require('./extract-props');
const rank = require('./rank');
const printResults = require('./print-results');

const Main = function Main() {};
Main.prototype.extract = extractProps;
Main.prototype.rank = rank;
Main.prototype.print = printResults;

module.exports = Main;
