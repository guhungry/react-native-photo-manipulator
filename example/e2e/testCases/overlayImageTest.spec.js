/* global device, element, by */

describe('overlayImage', () => {
  it('should load images after overlay image', async () => {
    await expect(element(by.id('example-exampleOverlayImage'))).toExist();

    await waitFor(element(by.id('overlayImageResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('overlayImagePngResult'))).toExist().withTimeout(2000);
  });
});
