import { by, device, element, expect } from 'detox';

describe('batch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after batch', async () => {
    await expect(element(by.id('example-exampleBatch'))).toExist();

    await waitFor(element(by.id('batchResult'))).toExist().withTimeout(3000);
    await waitFor(element(by.id('batchResultPng'))).toExist().withTimeout(3000);
  });
});
