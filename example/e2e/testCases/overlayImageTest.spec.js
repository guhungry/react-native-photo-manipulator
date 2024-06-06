import { by, device, element, expect } from 'detox';

describe('overlayImage', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load images after overlay image', async () => {
    await expect(element(by.id('example-exampleOverlayImage'))).toExist();

    await waitFor(element(by.id('overlayImageResult'))).toExist().withTimeout(15000);
    await waitFor(element(by.id('overlayImagePngResult'))).toExist().withTimeout(15000);
  });
});
