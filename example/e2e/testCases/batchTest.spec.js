/* global device, element, by */

describe('batch', () => {
  beforeEach(async (done) => {
    await device.reloadReactNative();
    done();
  });

  it('should load images after batch', async (done) => {
    await expect(element(by.id('example-exampleBatch'))).toExist();

    await expect(element(by.id('batchResult'))).toExist();
    done();
  });
});
