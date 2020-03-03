import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const data1 = fs.readFileSync(path1);
  const data2 = fs.readFileSync(path2);
  const parcedData1 = JSON.parse(data1);
  const parcedData2 = JSON.parse(data2);
  const data1Entries = Object.entries(parcedData1);
  const data2Entries = Object.entries(parcedData2);
  const changedAndRemoved = data1Entries.reduce((acc, el) => {
    const [key, value] = el;
    if(_.has(parcedData2, `${key}`)) {
      return parcedData2[key] ==  value ? acc + `  ${key}: ${value}\n` 
      : acc + `+ ${key}: ${parcedData2[key]}\n- ${key}: ${value}\n`;
    } else {
      return acc + `- ${key}: ${value}\n`;
    }
  }, '');
  const added = data2Entries.reduce((acc, el) => {
    const [key, value] = el
    if(!_.has(parcedData1, `${key}`)) {
      return acc + `+ ${key}: ${value}\n`
    } else {
      return acc;
    }
  }, '');
  return changedAndRemoved + added;
};
