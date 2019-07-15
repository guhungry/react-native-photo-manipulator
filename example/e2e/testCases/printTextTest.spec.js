/* global device, element, by */

describe('printText', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  it('should load images after printText', async (done) => {
    await expect(element(by.id('example-examplePrintText'))).toExist();

    await waitFor(element(by.id('printTextResult'))).toExist().withTimeout(2000);
    done();
  });
});
