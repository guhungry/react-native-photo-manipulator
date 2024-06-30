import {by, device, element, expect, waitFor} from 'detox';

describe('flipImage', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after rotated image', async () => {
    await expect(element(by.id('example-exampleRotate'))).toExist();

    await waitFor(element(by.id('rotate90Result')))
      .toExist()
      .withTimeout(15000);
    await waitFor(element(by.id('rotate180Result')))
      .toExist()
      .withTimeout(15000);
    await waitFor(element(by.id('rotate270Result')))
      .toExist()
      .withTimeout(15000);
  });
});
