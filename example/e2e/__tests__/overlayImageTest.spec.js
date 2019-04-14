/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  describe("overlayImage", () => {
    it('should load images after overlay image', async (done) => {
      await expect(element(by.id('example-exampleOverlayImage'))).toExist();

      await expect(element(by.id('overlayImageResult'))).toExist();
      done();
    });
  })
});
