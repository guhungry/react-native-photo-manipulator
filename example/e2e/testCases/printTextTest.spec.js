/* global device, element, by */

describe('printText', () => {
  it('should load images after printText', async () => {
    await expect(element(by.id('example-examplePrintText'))).toExist();

    await waitFor(element(by.id('printTextResult'))).toExist().withTimeout(2000);
    await waitFor(element(by.id('printTextPngResult'))).toExist().withTimeout(2000);
  });
});
