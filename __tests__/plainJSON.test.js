import genDiff from '../src/genDiff.js';
// import fs, { readFileSync } from 'fs';

const resultForJSON = `  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
`

test('JSONgendiff', () => {
//   const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/resultForJSON.txt`);
  expect(genDiff(`${__dirname}/__fixtures__/first.json`, `${__dirname}/__fixtures__/second.json`)).toBe(resultForJSON);
})