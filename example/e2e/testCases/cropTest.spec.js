import { by, device, element, expect } from 'detox';

describe('crop', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after crop', async () => {
    await expect(element(by.id('example-exampleCrop'))).toExist();

    await waitFor(element(by.id('cropResult'))).toExist().withTimeout(15000);
    await waitFor(element(by.id('cropResizeResult'))).toExist().withTimeout(15000);
    await waitFor(element(by.id('cropPngResult'))).toExist().withTimeout(3000);
  });
});
