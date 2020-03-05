import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';


export default (filePath) => {
  const data = fs.readFileSync(filePath);
  if (path.extname === '.json') {
    return JSON.parse(data); 
  }
  if (path.extname === '.yml') {
    return yaml.safeLoad(data);
  }
};
