/* global device, element, by */

describe('crop', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  it('should load images after crop', async (done) => {
    await expect(element(by.id('example-exampleCrop'))).toExist();

    await expect(element(by.id('cropResult'))).toExist();
    await expect(element(by.id('cropResizeResult'))).toExist();
    done();
  });
});
