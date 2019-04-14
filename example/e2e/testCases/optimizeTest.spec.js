/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  describe("optimize", () => {
    it('should load images after optimize', async (done) => {
      await expect(element(by.id('example-exampleOptimize'))).toExist();

      await expect(element(by.id('optimizeResult'))).toExist();
      done();
    });
  })
});
