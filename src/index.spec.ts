import test, { skipTest } from './index';
import { describe, vi, expect, Mock } from 'vitest';

describe('jest-gwt', () => {
  test('xtest does NOT invoke methods', {
    given: {
      a_given_function,
      a_when_function,
      a_then_function,
    },
    when: {
      executing_a_skiptest,
    },
    then: {
      given_NOT_called,
      when_NOT_called,
      then_NOT_called,
    },
  });

  test('TestContext is exported', {
    when: {
      importing_module,
    },
    then: {
      module_exports_TestContext,
    },
  });
});

type Context = {
  given: Mock<any>,
  when: Mock<any>,
  then: Mock<any>,

  module: any,
};

function a_given_function(this: Context) {
  this.given = vi.fn();
}

function a_when_function(this: Context) {
  this.when = vi.fn();
}

function a_then_function(this: Context) {
  this.then = vi.fn();
}

function executing_a_skiptest(this: Context) {
  skipTest('name', {
    given: {
      fn: this.given,
    },
    when: {
      fn: this.when,
    },
    then: {
      fn: this.then,
    },
  });
}

async function importing_module(this: Context) {
  this.module = await import('./index');
}

function given_NOT_called(this: Context) {
  expect(this.given).not.toHaveBeenCalled();
}

function when_NOT_called(this: Context) {
  expect(this.when).not.toHaveBeenCalled();
}

function then_NOT_called(this: Context) {
  expect(this.then).not.toHaveBeenCalled();
}

function module_exports_TestContext(this: Context) {
  expect(this.module.TestContext).toBeDefined();
}
