const extractProps = require('./extract-props');
const rank = require('./rank');

const Main = function Main() {};
Main.prototype.extract = extractProps;
Main.prototype.rank = rank;

module.exports = Main;
