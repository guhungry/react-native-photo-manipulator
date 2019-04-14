/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe("printText", () => {
    it('should load images after printText', async () => {
      await expect(element(by.id('example-examplePrintText'))).toExist();

      await expect(element(by.id('printTextResult'))).toExist();
    });
  })
});
