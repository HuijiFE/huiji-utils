/**
 * Test index.ts
 */
import { sayHello } from '.';

describe('Test Hello World', () => {
  test('sayHello', () => {
    expect(sayHello()).toBe('Hello World!');
  });
});
