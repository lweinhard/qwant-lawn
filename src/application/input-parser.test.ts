import { InputParser } from './input-parser';
import { Orientation } from '../domain/orientation';

describe('InputParser', () => {
  let parser: InputParser;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    parser = new InputParser();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('valid input', () => {
    it('should parse valid input with one mower', () => {
      const input = '5 5\n1 2 N\nLRFLF';
      const result = parser.parse(input);

      expect(result).not.toBeNull();
      expect(result?.lawn.width).toBe(5);
      expect(result?.lawn.height).toBe(5);
      expect(result?.mowers).toHaveLength(1);
      expect(result?.mowers[0].position.x).toBe(1);
      expect(result?.mowers[0].position.y).toBe(2);
      expect(result?.mowers[0].orientation).toBe(Orientation.North);
      expect(result?.mowers[0].instructions).toHaveLength(5);
    });

    it('should parse valid input with multiple mowers', () => {
      const input = '5 5\n1 2 N\nLRF\n3 3 E\nFFRFL';
      const result = parser.parse(input);

      expect(result).not.toBeNull();
      expect(result?.mowers).toHaveLength(2);
      expect(result?.mowers[0].position.x).toBe(1);
      expect(result?.mowers[1].position.x).toBe(3);
    });

    it('should handle CRLF line endings', () => {
      const input = '5 5\r\n1 2 N\r\nLRF';
      const result = parser.parse(input);

      expect(result).not.toBeNull();
      expect(result?.mowers).toHaveLength(1);
    });

    it('should handle all orientations', () => {
      const input = '5 5\n1 1 N\nF\n2 2 E\nF\n3 3 S\nF\n4 4 W\nF';
      const result = parser.parse(input);

      expect(result?.mowers[0].orientation).toBe(Orientation.North);
      expect(result?.mowers[1].orientation).toBe(Orientation.East);
      expect(result?.mowers[2].orientation).toBe(Orientation.South);
      expect(result?.mowers[3].orientation).toBe(Orientation.West);
    });
  });

  describe('invalid input', () => {
    it('should return null when input has less than 3 lines', () => {
      const input = '5 5\n1 2 N';
      expect(parser.parse(input)).toBeNull();
    });

    it('should return null when lawn size is invalid', () => {
      const input = 'invalid\n1 2 N\nLRF';
      expect(parser.parse(input)).toBeNull();
    });

    it('should return null when mower position is invalid', () => {
      const input = '5 5\ninvalid\nLRF';
      expect(parser.parse(input)).toBeNull();
    });

    it('should return null when mower is out of bounds', () => {
      const input = '5 5\n6 6 N\nLRF';
      expect(parser.parse(input)).toBeNull();
    });

    it('should return null when positions clash', () => {
      const input = '5 5\n1 2 N\nLRF\n1 2 E\nFFF';
      expect(parser.parse(input)).toBeNull();
    });

    it('should return null when instructions are invalid', () => {
      const input = '5 5\n1 2 N\nINVALID';
      expect(parser.parse(input)).toBeNull();
    });
  });
});
