/* global device, element, by */

describe('overlayImage', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  it('should load images after overlay image', async (done) => {
    await expect(element(by.id('example-exampleOverlayImage'))).toExist();

    await waitFor(element(by.id('overlayImageResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('overlayImagePngResult'))).toExist().withTimeout(2000);
    done();
  });
});
