# vitest-gwt
A small library to help vitest support given-when-then style testing without a
bunch of overhead

## Compatibility Chart

| vitest-gwt Version | vitest Version |
| ---------------- | ------------ |
|       1.x        |  ^0.34.4 |

## Usage

1. Install the package
    ```bash
    npm i --save-dev vitest-gwt
    ```
2. In your test files, import `test`
    ```js
    import test from 'vitest-gwt';
    ```
3. Write a test!
    ```js
    describe('test context', () => {
      test('has no expected errors', {
        given: {
          mock_jest_test_function,
          GOOD_test_case,
        },
        when: {
          executing_test_case,
        },
        then: {
          all_GIVENS_called,
          all_WHENS_called,
          all_THENS_called,
        },
      });
    });
    ```

## [Scenario Test](https://github.com/devzeebo/gwt-runner/blob/main/README.md#scenario-definition)

Sometimes a GWT flow doesn't make sense. You might be writing integration tests.
Or something that needs to assert something, then do another thing, then assert
something else.

In these cases, you can use the scenario definition style which allows chaining
`when` and `then`, followed by `then_when` and `then` blocks.

```ts
{
  given: {
    mock_jest_test_function,
    GOOD_test_case,
  },
  scenario: [{
    when: {
      executing_test_case,
    },
    then: {
      assert_something,
    },
  }, {
    then_when: {
      user_submits_form,
    },
    then: {
      something_else_happens,
      yet_another_thing_is_true,
    },
  }, {
    then_when: {
      something_happens,
    },
    then: {
      expect_error: some_check,
      and: {
        something_is_still_true,
      },
    }
  }]
}
```

## Disabling a test
Sometimes you want a test to be disabled in code. Vitest offers this functionality with
the `test.skip` method. We've provided this functionality with a distinct export with strong typing so you can
disable your gwt style tests.

```js
import test, {skiptest} from 'jest-gwt';

describe('test context', () => {
  test('this test will run', {
    then: {
      CANARY,
    },
  });

  skiptest('this test will NOT run', {
    when: {
      oops_we_broke_this,
    },
  });
});
```

## withAspect

`withAspect` wraps up vitests's `beforeEach` and `afterEach` to allow preparing and
cleaning up the context before running tests.

```js
withAspect(
  // this is the beforeEach. Do your prep work here
  function(this: Context) {
  },
  // this is the afterEach. It is OPTIONAL. If you need to do clean up of
  // external resources you allocated in the beforeEach, do it here
  function(this: Context) {
  }
)
```

The `afterEach` has access to whatever values you put on the Context in the
`beforeEach`. It does NOT have access to the values put on the Context during
the specific test.


## Detailed Usage

Please refer to [gwt-runner](https://github.com/devzeebo/gwt-runner) for
detailed usage on how to write tests and clauses.