import _ from 'lodash';
import parser from './parsers.js'

export default (path1, path2) => {
  const parcedData1 = parser(path1);
  const parcedData2 = parser(path2);
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
