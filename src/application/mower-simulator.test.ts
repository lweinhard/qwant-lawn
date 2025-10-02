import { MowerSimulator } from './mower-simulator';
import { Simulation } from '../domain/simulation';
import { Lawn } from '../domain/lawn';
import { Mower } from '../domain/mower';
import { Position } from '../domain/position';
import { Orientation } from '../domain/orientation';
import {
  TurnLeftInstruction,
  TurnRightInstruction,
  MoveForwardInstruction,
} from '../domain/instruction';

describe('MowerSimulator', () => {
  let simulator: MowerSimulator;

  beforeEach(() => {
    simulator = new MowerSimulator();
  });

  it('should execute forward movement', async () => {
    const lawn = new Lawn(5, 5);
    const mower = new Mower(new Position(0, 0), Orientation.North, [
      new MoveForwardInstruction(),
    ]);
    const simulation = new Simulation(lawn, [mower]);

    const results = await simulator.simulate(simulation);

    expect(results[0].position.x).toBe(0);
    expect(results[0].position.y).toBe(1);
  });

  it('should execute rotation instructions', async () => {
    const lawn = new Lawn(5, 5);
    const mower = new Mower(new Position(2, 2), Orientation.North, [
      new TurnLeftInstruction(),
      new TurnRightInstruction(),
    ]);
    const simulation = new Simulation(lawn, [mower]);

    const results = await simulator.simulate(simulation);

    expect(results[0].orientation).toBe(Orientation.North);
  });

  it('should prevent out of bounds movement', async () => {
    const lawn = new Lawn(5, 5);
    const mower = new Mower(new Position(5, 5), Orientation.North, [
      new MoveForwardInstruction(),
    ]);
    const simulation = new Simulation(lawn, [mower]);

    const results = await simulator.simulate(simulation);

    expect(results[0].position.x).toBe(5);
    expect(results[0].position.y).toBe(5);
  });

  it('should prevent collision between mowers', async () => {
    const lawn = new Lawn(5, 5);
    const mower1 = new Mower(new Position(1, 2), Orientation.North, [
      new MoveForwardInstruction(),
    ]);
    const mower2 = new Mower(new Position(1, 3), Orientation.South, []);
    const simulation = new Simulation(lawn, [mower1, mower2]);

    const results = await simulator.simulate(simulation);

    expect(results[0].position.x).toBe(1);
    expect(results[0].position.y).toBe(2);
  });

  it('should handle complex sequence', async () => {
    const lawn = new Lawn(5, 5);
    const mower = new Mower(new Position(1, 2), Orientation.North, [
      new TurnLeftInstruction(),
      new MoveForwardInstruction(),
      new TurnLeftInstruction(),
      new MoveForwardInstruction(),
      new TurnLeftInstruction(),
      new MoveForwardInstruction(),
      new TurnLeftInstruction(),
      new MoveForwardInstruction(),
      new MoveForwardInstruction(),
    ]);
    const simulation = new Simulation(lawn, [mower]);

    const results = await simulator.simulate(simulation);

    expect(results[0].position.x).toBe(1);
    expect(results[0].position.y).toBe(3);
    expect(results[0].orientation).toBe(Orientation.North);
  });
});
