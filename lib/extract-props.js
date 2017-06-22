const defaultParameters = require('./default-parameters');

const extractProps = function extractProps(program) {
  const props = Object.assign({}, defaultParameters);
  Object
    .keys(defaultParameters)
    .map(param => (props[param] = program[param] || defaultParameters[param]));
  return props;
};

module.exports = extractProps;
