/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  describe("printText", () => {
    it('should load images after printText', async (done) => {
      await expect(element(by.id('example-examplePrintText'))).toExist();

      await expect(element(by.id('printTextResult'))).toExist();
      done();
    });
  })
});
