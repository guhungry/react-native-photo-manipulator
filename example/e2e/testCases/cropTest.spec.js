/* global device, element, by */

describe('crop', () => {
  it('should load images after crop', async () => {
    await expect(element(by.id('example-exampleCrop'))).toExist();

    await waitFor(element(by.id('cropResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('cropResizeResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('cropPngResult'))).toExist().withTimeout(2000);
  });
});
