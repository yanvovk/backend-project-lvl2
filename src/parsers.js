import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';


export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  if (path.extname(filePath) === '.json') {
    return JSON.parse(data);
  }
  if (path.extname(filePath) === '.yml') {
    return yaml.safeLoad(data);
  }
  return data;
};
