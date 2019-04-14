/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe("crop", () => {
    it('should load images after crop', async () => {
      await expect(element(by.id('example-exampleCrop'))).toExist();

      await expect(element(by.id('cropResult'))).toExist();
      await expect(element(by.id('cropResizeResult'))).toExist();
    });
  })
});
