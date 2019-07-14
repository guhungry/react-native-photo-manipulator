/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done()
  });

  describe("batch", () => {
    it('should load images after batch', async (done) => {
      await expect(element(by.id('example-exampleBatch'))).toExist();

      await expect(element(by.id('batchResult'))).toExist();
      done();
    });
  })
});
