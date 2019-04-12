/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
/* global device, element, by */

describe('PhotoManipulator', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
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
