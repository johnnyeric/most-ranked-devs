require('dotenv').config();
const expect = require('chai').expect;
const assert = require('chai').assert;
const fetchGithubData = require('../lib/fetch-github-data');
const defaultParameters = require('../lib/default-parameters');
const constants = require('../lib/constants');

const props = {
  city: defaultParameters[constants.CITY],
  language: defaultParameters[constants.LANGUAGE],
};

const user = { login: 'tj' };

describe('Users fetching through Github API', () => {
  it('returns users filtered by location and programming language with correct count for default parameters', async () => {
    const users = await fetchGithubData.searchUsers(props);
    assert.isAbove(users.data.total_count, 31);
  });
});

describe('Repos fetching by user through Github API', () => {
  it('returns all repos belonging to a specific user', async () => {
    const repos = await fetchGithubData.getReposByUser(user);
    expect(repos.length).to.satisfy(length => length > 0);
  });
});
