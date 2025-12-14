/**
 * Workaround for a React Native Jest crash in `react-native/jest/mockComponent`.
 *
 * RN's implementation assumes `RealComponent.prototype` always exists when
 * `typeof RealComponent === 'function'`, which is not true for arrow function
 * components (e.g. `const Foo = (props) => ...`).
 *
 * We keep the public behavior but guard access to `.prototype`.
 */

import { jest } from '@jest/globals';
('use strict');

const path = require('path');
const React = require('react');

function resolveFromReactNativeJestDir(moduleName) {
  if (typeof moduleName !== 'string') {
    return moduleName;
  }

  // RN's `mockComponent` expects `moduleName` to be relative to
  // `react-native/jest/`.
  if (moduleName.startsWith('.')) {
    const rnRoot = path.dirname(require.resolve('react-native/package.json'));
    const rnJestDir = path.join(rnRoot, 'jest');
    return path.join(rnJestDir, moduleName);
  }

  return moduleName;
}

function getDisplayName(RealComponent) {
  return (
    RealComponent?.displayName ??
    RealComponent?.name ??
    (RealComponent?.render == null
      ? 'Unknown'
      : (RealComponent.render.displayName ?? RealComponent.render.name)) ??
    'Unknown'
  );
}

function isClassComponent(RealComponent) {
  if (typeof RealComponent !== 'function') {
    return false;
  }
  const proto = RealComponent.prototype;
  // Arrow functions have no prototype.
  if (!proto) {
    return false;
  }
  // React class components have this marker.
  if (proto.isReactComponent) {
    return true;
  }
  // Fallback heuristic.
  return typeof proto.render === 'function';
}

function mockComponent(moduleName, instanceMethods, isESModule) {
  const actual = jest.requireActual(resolveFromReactNativeJestDir(moduleName));
  const RealComponent = isESModule ? actual.default : actual;

  const SuperClass = isClassComponent(RealComponent)
    ? RealComponent
    : React.Component;

  const name = getDisplayName(RealComponent);
  const nameWithoutPrefix = String(name).replace(/^(RCT|RK)/, '');

  const Component = class extends SuperClass {
    render() {
      const defaultProps = RealComponent?.defaultProps ?? {};
      const props = { ...defaultProps };

      if (this.props) {
        Object.keys(this.props).forEach((prop) => {
          if (this.props[prop] !== undefined) {
            props[prop] = this.props[prop];
          }
        });
      }

      return React.createElement(
        nameWithoutPrefix,
        props,
        this.props?.children
      );
    }
  };

  Object.defineProperty(Component, 'name', {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true,
  });

  Component.displayName = nameWithoutPrefix;

  if (
    RealComponent &&
    (typeof RealComponent === 'function' || typeof RealComponent === 'object')
  ) {
    Object.keys(RealComponent).forEach((classStatic) => {
      Component[classStatic] = RealComponent[classStatic];
    });
  }

  if (instanceMethods != null) {
    Object.assign(Component.prototype, instanceMethods);
  }

  return Component;
}

module.exports = {
  __esModule: true,
  default: mockComponent,
};
