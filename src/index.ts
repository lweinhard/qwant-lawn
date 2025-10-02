import { InputParser } from './application/input-parser';
import { FileInputReader } from './infrastructure/file-input-reader';

const main = async () => {
  try {
    const inputReader = new FileInputReader();
    const rawInput = inputReader.read();
    const inputParser = new InputParser();
    const simulation = inputParser.parse(rawInput);

    if (!simulation) {
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Program failed:', error);
    process.exit(1);
  }
};

main();
