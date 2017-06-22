require('dotenv').config();
const expect = require('chai').expect;
const Main = require('../lib/');
const defaultParameters = require('../lib/default-parameters');
const constants = require('../lib/constants');

const program = {
  city: defaultParameters[constants.CITY],
  number: defaultParameters[constants.NUMBER],
  language: defaultParameters[constants.LANGUAGE],
};

const main = new Main();
const props = main.extract(Object.assign({}, program));

describe('Rank users through Github API', () => {
  it('ranks n developers of a specific language in a city accordingly to the number repository stars', async () => {
    const rankedUsers = await main.rank(props);
    expect(rankedUsers.length).to.be.equal(props.number);
  });
});
