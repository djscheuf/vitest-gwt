import type {
  beforeEach as viBeforeEach,
  afterEach as viAfterEach,
} from 'vitest';
import { TestContext } from 'gwt-runner';

type Callback<T> = (this: T) => any;

export default (
  beforeEach: typeof viBeforeEach,
  afterEach: typeof viAfterEach,
) => (
  <T>(
    before: Callback<T>,
    after?: Callback<T>,
  ) => {
    beforeEach(async () => {
      TestContext.createContext();

      await (before.bind(TestContext.context as T) as any)();
    });

    afterEach(async () => {
      if (after) {
        await (after.bind(TestContext.context as T) as any)();
      }

      TestContext.releaseContext();
    });
  }
);
