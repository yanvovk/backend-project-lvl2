import commander from 'commander';
import FormatInterface from './formatInterface.js'


const help = () => {
  console.log('\nUsage: gendiff [options] <firstConfig> <secondConfig>\n');
  console.log('Compares two configuration files and shows a difference.\n');
  console.log('Options:');
  console.log('  -V, --version       output the version number');
  console.log('  -h, --help          output usage information');
  console.log('  -f, --format [type] output format');
};

export default () => {
  const programm = new commander.Command();
  programm.version('0.0.1');
  programm
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information', help)
    .option('-f, --format [type]', 'output format')
    .on('--help', help)
    .arguments('<cmd1> <cmd2> [env]')
    .action((cmd1, cmd2,) => {
      const cmdVal1 = cmd1;
      const cmdVal2 = cmd2;
      const _format = new FormatInterface(cmdVal1, cmdVal2)
      if(programm.format) {
        console.log(_format[programm.format]());
      }
      console.log(_format.objective());
      
    });

  programm.parse(process.argv);

  if (programm.version) {
    console.log(programm.version);
  }
};
