/* global device, element, by */

describe('batch', () => {
  it('should load images after batch', async () => {
    await expect(element(by.id('example-exampleBatch'))).toExist();

    await waitFor(element(by.id('batchResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('batchResultPng'))).toExist().withTimeout(2000);
  });
});
