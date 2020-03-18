import genDiff from '../src/formatters/genDiff.js';
import plainDiff from '../src/formatters/plainDiff.js';
import fs from 'fs';

const expectedObjectiveResult = fs.readFileSync(`${__dirname}/__fixtures__/objectiveResult.txt`, 'utf-8');
const expectedPlainResult = fs.readFileSync(`${__dirname}/__fixtures__/plainResult.txt`, 'utf-8')

test('JSONobjective', () => {
  expect(genDiff(`${__dirname}/__fixtures__/first.json`, `${__dirname}/__fixtures__/second.json`)).toBe(expectedObjectiveResult);
});

test('YAMLobjective', () => {
  expect(genDiff(`${__dirname}/__fixtures__/first.yml`, `${__dirname}/__fixtures__/second.yml`)).toBe(expectedObjectiveResult);
});

test('INIobjective', () => {
  expect(genDiff(`${__dirname}/__fixtures__/first.ini`, `${__dirname}/__fixtures__/second.ini`)).toBe(expectedObjectiveResult);
});

test('JSONplain', () => {
  expect(plainDiff(`${__dirname}/__fixtures__/first.json`, `${__dirname}/__fixtures__/second.json`)).toBe(expectedPlainResult);
});

test('YMLplain', () => {
  expect(plainDiff(`${__dirname}/__fixtures__/first.yml`, `${__dirname}/__fixtures__/second.yml`)).toBe(expectedPlainResult);
});

test('INIplain', () => {
  expect(plainDiff(`${__dirname}/__fixtures__/first.ini`, `${__dirname}/__fixtures__/second.ini`)).toBe(expectedPlainResult);
});