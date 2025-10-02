import { Simulation } from '../domain/simulation';
import { Lawn } from '../domain/lawn';
import { Mower } from '../domain/mower';
import { Position } from '../domain/position';
import { Orientation } from '../domain/orientation';
import {
  Instruction,
  InstructionType,
  TurnLeftInstruction,
  TurnRightInstruction,
  MoveForwardInstruction,
} from '../domain/instruction';

export interface IInputParser {
  parse(input: string): Simulation | null;
}

export class InputParser implements IInputParser {
  private static readonly MAP_SIZE_REGEX = /^\d+\s\d+$/;
  private static readonly MOWER_POSITION_REGEX = /^\d+\s\d+\s[NEWS]$/;
  private static readonly MOWER_INSTRUCTIONS_REGEX = /^[LRF]+$/;

  parse(input: string): Simulation | null {
    const lines = input.split(/\r?\n/);

    if (lines.length < 3) {
      console.error('File must have at least 3 lines: map size + 1 mower');
      return null;
    }

    const lawn = this.parseLawn(lines[0]);
    if (!lawn) {
      return null;
    }

    const mowers: Mower[] = [];
    const occupiedPositions = new Set<string>();

    for (let i = 1; i < lines.length; i += 2) {
      const mower = this.parseMower(
        lawn,
        lines[i],
        lines[i + 1],
        i + 1,
        i + 2,
        occupiedPositions,
      );
      if (!mower) {
        return null;
      }
      mowers.push(mower);
      occupiedPositions.add(mower.position.toKey());
    }

    return new Simulation(lawn, mowers);
  }

  private parseLawn(line: string): Lawn | null {
    if (!InputParser.MAP_SIZE_REGEX.test(line)) {
      console.error('Invalid map size:', line);
      console.error('Map size format: X Y');
      console.error('X and Y must be >= 0');
      return null;
    }

    const [width, height] = line.split(' ').map(Number);
    return new Lawn(width, height);
  }

  private parseMower(
    lawn: Lawn,
    posLine: string,
    instrLine: string,
    posLineNumber: number,
    instrLineNumber: number,
    occupiedPositions: Set<string>,
  ): Mower | null {
    if (!InputParser.MOWER_POSITION_REGEX.test(posLine)) {
      console.error(
        `Invalid mower position at line ${posLineNumber}: ${posLine}`,
      );
      console.error('Format must be: X Y O (O = N, E, W, S)');
      return null;
    }

    const [xStr, yStr, orientationStr] = posLine.split(' ');
    const position = new Position(Number(xStr), Number(yStr));
    const orientation = orientationStr as Orientation;

    if (!lawn.isWithinBounds(position)) {
      console.error(
        `Invalid mower position at line ${posLineNumber}: ${posLine}`,
      );
      console.error('Mower position is out of bounds');
      return null;
    }

    if (occupiedPositions.has(position.toKey())) {
      console.error(
        `Invalid mower position at line ${posLineNumber}: ${posLine}`,
      );
      console.error(
        `Position (${position.x}, ${position.y}) is already occupied by another mower`,
      );
      return null;
    }

    if (!InputParser.MOWER_INSTRUCTIONS_REGEX.test(instrLine)) {
      console.error(
        `Invalid mower instructions at line ${instrLineNumber}: ${instrLine}`,
      );
      console.error('Instructions must be a sequence of L, R, F');
      return null;
    }

    const instructions = this.parseInstructions(instrLine);
    return new Mower(position, orientation, instructions);
  }

  private parseInstructions(instrLine: string): Instruction[] {
    const instructions: Instruction[] = [];
    for (const char of instrLine) {
      switch (char as InstructionType) {
        case InstructionType.TurnLeft:
          instructions.push(new TurnLeftInstruction());
          break;
        case InstructionType.TurnRight:
          instructions.push(new TurnRightInstruction());
          break;
        case InstructionType.MoveForward:
          instructions.push(new MoveForwardInstruction());
          break;
      }
    }
    return instructions;
  }
}
