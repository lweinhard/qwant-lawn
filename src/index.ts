import { InputParser } from './application/input-parser';
import { MowerSimulator } from './application/mower-simulator';
import { ConsoleOutputWriter } from './infrastructure/console-output-writer';
import { FileInputReader } from './infrastructure/file-input-reader';

const main = async () => {
  try {
    const inputReader = new FileInputReader();
    const rawInput = inputReader.read();
    const inputParser = new InputParser();
    const simulator = new MowerSimulator();
    const outputWriter = new ConsoleOutputWriter();

    const simulation = inputParser.parse(rawInput);

    if (!simulation) {
      process.exit(1);
    }

    const results = await simulator.simulate(simulation);
    outputWriter.write(results);

    process.exit(0);
  } catch (error) {
    console.error('Program failed:', error);
    process.exit(1);
  }
};

main();
