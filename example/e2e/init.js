const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');

// Set the default timeout
jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async (done) => {
  await detox.init(config);
  done();
});

beforeEach(async (done) => {
  await adapter.beforeEach();
  done();
});

afterAll(async (done) => {
  await adapter.afterAll();
  await detox.cleanup();
  done();
});
