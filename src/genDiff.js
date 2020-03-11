import _ from 'lodash';
import parser from './parsers.js';

const isObject = (element) => {
  if(typeof(element) === 'object') {
    return true;
  };
  return false;
}

const stringify = (item, rep = 1) => {
  if(!isObject(item)) {
    return item;
  } 
  const entries = Object.entries(item);
  let result = ``;
  for(let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if(isObject(value)) {
      result = `${result}${' '.repeat(rep)}${key}: ${stringify(value, rep + 2)}${' '.repeat(rep + 2)}\n`;
    } else {
      result = `${result}${' '.repeat(rep)}${key}: ${value}\n`;
    } 
  }
  return `{\n${result}${' '.repeat(rep)}}`;
}


const buildDiff = (data1, data2, rep = 1) => {
  const data1entries = Object.entries(data1);
  const data2entries = Object.entries(data2);
  const changedAndRemoved = data1entries.reduce((acc, el) => {
    const [key, value] = el;
    if(isObject(value) && isObject(data2[key])) {
      return `${acc}${' '.repeat(rep + 2)}${key}: {\n${buildDiff(value, data2[key], rep + 2)}${' '.repeat(rep + 2)}}\n`;
    }
    if(_.has(data2, `${key}`)) {
      return (data2[key] ===  value) ? `${acc}${' '.repeat(rep + 2)}${key}: ${stringify(value, rep + 4)}\n` 
      : `${acc}${' '.repeat(rep)}+ ${key}: ${stringify(data2[key], rep + 4)}\n${' '.repeat(rep)}- ${key}: ${stringify(value, rep + 4)}\n`;
    }
    return `${acc}${' '.repeat(rep)}- ${key}: ${stringify(value, rep + 4)}\n`;
  }, '');
  const added = data2entries.reduce((acc, el) => {
    const [key, value] = el;
    if(!_.has(data1, `${key}`)) {
      return `${acc}${' '.repeat(rep)}+ ${key}: ${stringify(value, rep + 4)}\n`;
    } else {
      return acc;
    }
  }, '');
  return changedAndRemoved + added;
}



export default (path1, path2) => {
  const parsedData1 = parser(path1);
  const parsedData2 = parser(path2);
  return buildDiff(parsedData1, parsedData2);
};
