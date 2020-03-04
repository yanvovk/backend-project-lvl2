import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
};

export default (path1, path2) => {
  const extname1 = path.extname(path1);
  const extname2 = path.extname(path2);
  const data1 = fs.readFileSync(path1);
  const data2 = fs.readFileSync(path2);
  const parcedData1 = parsers[extname1](data1);
  const parcedData2 = parsers[extname2](data2);
  const data1Entries = Object.entries(parcedData1);
  const data2Entries = Object.entries(parcedData2);
  const changedAndRemoved = data1Entries.reduce((acc, el) => {
    const [key, value] = el;
    if (_.has(parcedData2, `${key}`)) {
      return parcedData2[key] === value ? `${acc}  ${key}: ${value}\n`
        : `${acc}+ ${key}: ${parcedData2[key]}\n- ${key}: ${value}\n`;
    }
    return `${acc}- ${key}: ${value}\n`;
  }, '');
  const added = data2Entries.reduce((acc, el) => {
    const [key, value] = el;
    if (!_.has(parcedData1, `${key}`)) {
      return `${acc}+ ${key}: ${value}\n`;
    }
    return acc;
  }, '');
  return changedAndRemoved + added;
};
