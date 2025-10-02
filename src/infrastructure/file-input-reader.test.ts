import fs from 'node:fs';
import { argv, exit } from 'node:process';
import * as path from 'path';
import { FileInputReader } from './file-input-reader';

jest.mock('node:fs');
jest.mock('node:process', () => ({
  argv: [],
  exit: jest.fn(),
}));
jest.mock('path');

describe('FileInputReader', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;
  const mockExit = exit as jest.MockedFunction<typeof exit>;
  let reader: FileInputReader;

  beforeEach(() => {
    jest.clearAllMocks();
    (argv as string[]).length = 0;
    argv.push('node', 'script.js');
    reader = new FileInputReader();
  });

  it('should read and trim file content', () => {
    const filePath = 'input.txt';
    const fileContent = '  test content  ';
    const resolvedPath = '/absolute/path/input.txt';

    argv.push(filePath);
    mockPath.resolve.mockReturnValue(resolvedPath);
    mockFs.readFileSync.mockReturnValue(fileContent);

    const result = reader.read();

    expect(result).toBe('test content');
  });

  it('should exit when no file path provided', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    reader.read();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
  });

  it('should throw error on read failure', () => {
    const filePath = 'nonexistent.txt';
    argv.push(filePath);
    mockPath.resolve.mockReturnValue('/path/nonexistent.txt');
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => reader.read()).toThrow('Failed to read input file');
  });
});
