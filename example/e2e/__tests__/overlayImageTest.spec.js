/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe("overlayImage", () => {
    it('should load images after overlay image', async () => {
      await expect(element(by.id('example-exampleOverlayImage'))).toExist();

      await expect(element(by.id('overlayImageResult'))).toExist();
    });
  })
});
