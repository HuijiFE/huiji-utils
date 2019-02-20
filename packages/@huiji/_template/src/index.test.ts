/**
 * Test index.ts
 */
import { sayHello } from './index';

describe('Test Hello World', () => {
  test('sayHello', () => {
    expect(sayHello()).toBe('Hello World!');
  });
});
