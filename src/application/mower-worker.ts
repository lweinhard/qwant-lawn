import { parentPort, workerData } from 'worker_threads';
import { Mower } from '../domain/mower';
import { Lawn } from '../domain/lawn';
import { Position } from '../domain/position';
import { InstructionType } from '../domain/instruction';
import { SimulationResult } from '../domain/simulation';
import { Orientation } from '../domain/orientation';

interface WorkerData {
  mower: {
    id: number;
    position: { x: number; y: number };
    orientation: string;
    instructions: Array<{ type: string }>;
  };
  lawn: { width: number; height: number };
  sharedGrid: SharedArrayBuffer;
}

const data = workerData as WorkerData;
const { mower: mowerData, lawn: lawnData, sharedGrid } = data;

const lawn = new Lawn(lawnData.width, lawnData.height);
const gridView = new Int32Array(sharedGrid);
const gridWidth = lawn.width + 1;

const mower = new Mower(
  new Position(mowerData.position.x, mowerData.position.y),
  mowerData.orientation as Orientation,
  mowerData.instructions as Array<{ type: InstructionType }>,
);
mower.id = mowerData.id;

function getGridIndex(x: number, y: number): number {
  return y * gridWidth + x;
}

for (const instruction of mower.instructions) {
  switch (instruction.type) {
    case InstructionType.TurnLeft: {
      mower.turnLeft();
      break;
    }

    case InstructionType.TurnRight: {
      mower.turnRight();
      break;
    }

    case InstructionType.MoveForward: {
      const nextPosition = mower.getNextPosition();

      if (!lawn.isWithinBounds(nextPosition)) {
        break;
      }

      const currentIndex = getGridIndex(mower.position.x, mower.position.y);
      const nextIndex = getGridIndex(nextPosition.x, nextPosition.y);

      const oldValue = Atomics.compareExchange(
        gridView,
        nextIndex,
        0,
        mower.id + 1,
      );

      if (oldValue === 0) {
        Atomics.store(gridView, currentIndex, 0);
        mower.moveForward(nextPosition);
      }
      break;
    }
  }
}

const result: SimulationResult = {
  position: mower.position,
  orientation: mower.orientation,
};

parentPort?.postMessage(result);
