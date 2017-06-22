require('dotenv').config();
const expect = require('chai').expect;
const processData = require('../lib/process-data');
const defaultParameters = require('../lib/default-parameters');
const constants = require('../lib/constants');

const props = {
  city: defaultParameters[constants.CITY],
  number: defaultParameters[constants.NUMBER],
  language: defaultParameters[constants.LANGUAGE],
};

describe('Process and merge the User and Repository data from Github API', () => {
  it('should fetch and inject starsCount and repos array in users array', async () => {
    const users = await processData.process(props);
    expect(users[0]).to.have.own.property('starsCount');
    expect(users[0]).to.have.own.property('repos');
  });
});
