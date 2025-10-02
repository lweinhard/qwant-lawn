import fs from 'node:fs';
import path from 'node:path';
import { argv, exit } from 'node:process';

export interface IInputReader {
  read(): string;
}

export class FileInputReader implements IInputReader {
  read(): string {
    const inputFilePath = argv[2];

    if (!inputFilePath) {
      console.error('Usage: npm start <inputFilePath>');
      exit(1);
    }

    try {
      return fs.readFileSync(path.resolve(inputFilePath), 'utf-8').trim();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to read input file: ${error.message}`);
      }
      throw new Error('Failed to read input file.');
    }
  }
}
