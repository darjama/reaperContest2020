require('dotenv').config();

test('how much wood', () => {
  expect(process.env.TEST_VAL).toBe('1');
});
