/* global device, element, by */

describe('optimize', () => {
  it('should load images after optimize', async () => {
    await expect(element(by.id('example-exampleOptimize'))).toExist();

    await waitFor(element(by.id('optimizeResult'))).toExist().withTimeout(2000);
  });
});
