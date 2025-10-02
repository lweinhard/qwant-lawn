import { SimulationResult } from '../domain/simulation';

export interface IOutputWriter {
  write(results: SimulationResult[]): void;
}

export class ConsoleOutputWriter implements IOutputWriter {
  write(results: SimulationResult[]): void {
    for (const result of results) {
      console.log(
        `${result.position.x} ${result.position.y} ${result.orientation}`,
      );
    }
  }
}
