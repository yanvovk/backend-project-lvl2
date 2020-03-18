import _ from 'lodash';
import parser from '../parsers.js';
import isObject from '../isObj.js';

const strings = {
  wasChanged: (prop, from, to) => `Property ${prop} was changed from ${from} to ${to}\n`,
  wasDeleted: (prop) => `Property ${prop} was deleted\n`,
  wasAdded: (prop, value) => `Property ${prop} was added with value: ${value}\n`,
};

const outputComplex = (data) => {
  if (isObject(data)) {
    return '[complex value]';
  }
  return data;
};


const buildDiff = (data1, data2, current = '') => {
  const data1entries = Object.entries(data1);
  const data2entries = Object.entries(data2);
  const changedAndRemoved = data1entries.reduce((acc, el) => {
    const [key, value] = el;
    if (isObject(value) && isObject(data2[key])) {
      return `${acc}${buildDiff(value, data2[key], `${current}${key}.`)}`;
    }
    if (_.has(data2, `${key}`)) {
      return (data2[key] === value) ? acc : `${acc}${strings.wasChanged(`${current}${key}`, outputComplex(value), outputComplex(data2[key]))}`;
    }
    return `${acc}${strings.wasDeleted(`${current}${key}`)}`;
  }, '');
  const added = data2entries.reduce((acc, el) => {
    const [key, value] = el;
    if (!_.has(data1, `${key}`)) {
      return `${acc}${strings.wasAdded(`${current}${key}`, outputComplex(value))}`;
    }
    return acc;
  }, '');
  return changedAndRemoved + added;
};

export default (path1, path2) => {
  const parsedData1 = parser(path1);
  const parsedData2 = parser(path2);
  return buildDiff(parsedData1, parsedData2);
};
