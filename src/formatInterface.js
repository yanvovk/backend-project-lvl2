import genDiff from './formatters/genDiff.js';
import plainDiff from './formatters/plainDiff.js';

export default class FormatInterface{
  constructor(path1, path2) {
    this.path1 = path1;
    this.path2 = path2;       
  }

  objective() {
    return genDiff(this.path1, this.path2);
  }

  plain() {
    return plainDiff(this.path1, this.path2);
  }
}