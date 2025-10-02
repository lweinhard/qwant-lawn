import { Worker } from 'worker_threads';
import { ISimulator } from '../domain/simulation';
import { Simulation, SimulationResult } from '../domain/simulation';
import { Mower } from '../domain/mower';
import { Lawn } from '../domain/lawn';
import path from 'path';

export class MowerSimulator implements ISimulator {
  async simulate(simulation: Simulation): Promise<SimulationResult[]> {
    const lawn = simulation.lawn;

    const gridSize = (lawn.width + 1) * (lawn.height + 1);
    const sharedGrid = new SharedArrayBuffer(
      Int32Array.BYTES_PER_ELEMENT * gridSize,
    );
    const gridView = new Int32Array(sharedGrid);

    simulation.mowers.forEach((mower) => {
      const index = mower.position.y * (lawn.width + 1) + mower.position.x;
      Atomics.store(gridView, index, mower.id + 1);
    });

    const workerPromises = simulation.mowers.map((mower) =>
      this.processInWorker(mower, lawn, sharedGrid),
    );

    const results = await Promise.all(workerPromises);

    return results;
  }

  private processInWorker(
    mower: Mower,
    lawn: Lawn,
    sharedGrid: SharedArrayBuffer,
  ): Promise<SimulationResult> {
    return new Promise((resolve, reject) => {
      const isDev = __filename.endsWith('.ts');

      const workerPath = isDev
        ? path.resolve(__dirname, './mower-worker.ts')
        : path.resolve(__dirname, './mower-worker.js');

      const execArgv = isDev ? ['-r', 'ts-node/register'] : [];

      const worker = new Worker(workerPath, {
        workerData: {
          mower: {
            id: mower.id,
            position: { x: mower.position.x, y: mower.position.y },
            orientation: mower.orientation,
            instructions: mower.instructions,
          },
          lawn: { width: lawn.width, height: lawn.height },
          sharedGrid,
        },
        execArgv,
      });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker exited with code ${code}`));
        }
      });
    });
  }
}
