const parameters = require('./parameters');

const extractProps = function extractProps(program) {
  const props = Object.assign({}, parameters);
  Object.keys(parameters).map(param => (props[param] = program[param] || undefined));
  return props;
};

module.exports = extractProps;

