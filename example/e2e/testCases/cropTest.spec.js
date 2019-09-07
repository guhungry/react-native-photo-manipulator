/* global device, element, by */

describe('crop', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  it('should load images after crop', async (done) => {
    await expect(element(by.id('example-exampleCrop'))).toExist();

    await waitFor(element(by.id('cropResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('cropResizeResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('cropPngResult'))).toExist().withTimeout(2000);
    done();
  });
});
