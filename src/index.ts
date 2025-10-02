import { FileInputReader } from './infrastructure/file-input-reader';

const main = async () => {
  try {
    const inputReader = new FileInputReader();
    const rawInput = inputReader.read();

    console.log(rawInput);

    process.exit(0);
  } catch (error) {
    console.error('Program failed:', error);
    process.exit(1);
  }
};

main();
