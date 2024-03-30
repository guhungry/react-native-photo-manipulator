import { by, device, element, expect } from 'detox';

describe('flipImage', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after flipped image', async () => {
    await expect(element(by.id('example-exampleFlip'))).toExist();

    await waitFor(element(by.id('flipBothResult'))).toExist().withTimeout(5000);
    await waitFor(element(by.id('flipHorizontalResult'))).toExist().withTimeout(5000);
    await waitFor(element(by.id('flipVerticalResult'))).toExist().withTimeout(5000);
  });
});
