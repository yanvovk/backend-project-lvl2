import genDiff from '../src/genDiff.js';

const expectedResult = `  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
`;

test('JSONgendiff', () => {
  expect(genDiff(`${__dirname}/__fixtures__/first.json`, `${__dirname}/__fixtures__/second.json`)).toBe(expectedResult);
})