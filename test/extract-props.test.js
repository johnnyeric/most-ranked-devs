const expect = require('chai').expect;
const extractProps = require('../lib/extract-props');
const defaultParameters = require('../lib/default-parameters');

const program = { city: 'Sorocaba', number: 8 };

describe('Props extraction from command line arguments', () => {
  it('extract props correctly', () => {
    const props = extractProps(program);
    Object.keys(program).map(param => expect(props[param]).to.be.equal(program[param]));
  });

  it('props should have only relevant arguments', () => {
    const props = extractProps(program);
    const parametersSize = Object.keys(defaultParameters).length;
    const propsSize = Object.keys(props).length;
    expect(parametersSize).to.be.equal(propsSize);
  });
});
