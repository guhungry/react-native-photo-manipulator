import {by, device, element, expect, waitFor} from 'detox';

describe('batch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after batch', async () => {
    await expect(element(by.id('example-exampleBatch'))).toExist();

    await waitFor(element(by.id('batchResult')))
      .toExist()
      .withTimeout(15000);
    await waitFor(element(by.id('batchResultPng')))
      .toExist()
      .withTimeout(15000);
  });
});
