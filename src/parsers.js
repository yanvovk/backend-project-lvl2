import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';


export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  if (path.extname(filePath) === '.json') {
    return JSON.parse(data);
  }
  if (path.extname(filePath) === '.yml') {
    return yaml.safeLoad(data);
  }
  if (path.extname(filePath) === '.ini') {
    return ini.parse(data);
  }
  throw new Error('Wrong format!');
};
