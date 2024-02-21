import { by, device, element, expect } from 'detox';

describe('PhotoManipulator', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should load example app with no errors and show all the examples by default', async () => {
    await expect(element(by.id('examplesTitle'))).toExist();
    await expect(element(by.id('example-originalImage'))).toExist();
    await expect(element(by.id('example-overlayImage'))).toExist();
    await expect(element(by.id('example-exampleOverlayImage'))).toExist();
    await expect(element(by.id('example-examplePrintText'))).toExist();
    await expect(element(by.id('example-exampleCrop'))).toExist();
    await expect(element(by.id('example-exampleOptimize'))).toExist();
    await expect(element(by.id('example-exampleBatch'))).toExist();
  });
});
