import { Lawn } from './lawn';
import { Mower } from './mower';
import { Position } from './position';
import { Orientation } from './orientation';

export class Simulation {
  constructor(
    public readonly lawn: Lawn,
    public readonly mowers: Mower[],
  ) {}
}

export interface SimulationResult {
  position: Position;
  orientation: Orientation;
}

export interface ISimulator {
  simulate(simulation: Simulation): Promise<SimulationResult[]>;
}
