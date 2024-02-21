import { by, device, element, expect } from 'detox';

describe('printText', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after printText', async () => {
    await expect(element(by.id('example-examplePrintText'))).toExist();

    await waitFor(element(by.id('printTextResult'))).toExist().withTimeout(3000);
    await waitFor(element(by.id('printTextPngResult'))).toExist().withTimeout(3000);
  });
});
