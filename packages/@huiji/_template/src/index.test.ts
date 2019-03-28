/**
 * Test index.ts
 */
import { sayHello, A, B } from '.';

describe('Test Hello World', () => {
  test('sayHello', () => {
    expect(sayHello()).toBe('Hello World!');
  });
});

describe('Test multiple constants exports', () => {
  test('constants A', () => {
    expect(A).toBe('a');
    expect(B).toBe('b');
  });
});
