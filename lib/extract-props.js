const defaultParameters = require('./default-parameters');
const debug = require('debug')('most-ranked-devs');

const extractProps = function extractProps(program) {
  const props = Object.assign({}, defaultParameters);
  debug('Commander object: %O', program);
  Object
    .keys(defaultParameters)
    .map(param => (props[param] = program[param] || defaultParameters[param]));
  debug('Extracted props: %O', props);
  return props;
};

module.exports = extractProps;
