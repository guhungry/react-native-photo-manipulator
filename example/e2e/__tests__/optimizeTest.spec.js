/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe("optimize", () => {
    it('should load images after optimize', async () => {
      await expect(element(by.id('example-exampleOptimize'))).toExist();

      await expect(element(by.id('optimizeResult'))).toExist();
    });
  })
});
