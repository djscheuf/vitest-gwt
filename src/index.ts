import type { GwtDefinition } from 'gwt-runner';
import gwtRunner, { TestContext } from 'gwt-runner';
import {
  test as viTest,
  beforeEach as viBeforeEach,
  afterEach as viAfterEach,
} from 'vitest';
import withAspectBuilder from './withAspect';

export default gwtRunner(viTest);
export { TestContext };

export const xtest = (() => {}) as (<T>(name: string, def: GwtDefinition<T>) => void);

export const withAspect = withAspectBuilder(viBeforeEach, viAfterEach);
