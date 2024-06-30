import {by, device, element, expect, waitFor} from 'detox';

describe('optimize', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after optimize', async () => {
    await expect(element(by.id('example-exampleOptimize'))).toExist();

    await waitFor(element(by.id('optimizeResult')))
      .toExist()
      .withTimeout(15000);
  });
});
