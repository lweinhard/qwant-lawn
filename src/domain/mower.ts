import { Instruction } from './instruction';
import { Position } from './position';
import { Orientation, OrientationHelper } from './orientation';

export class Mower {
  public id: number = 0;

  constructor(
    public position: Position,
    public orientation: Orientation,
    public readonly instructions: Instruction[],
  ) {}

  turnLeft(): void {
    this.orientation = OrientationHelper.rotateLeft(this.orientation);
  }

  turnRight(): void {
    this.orientation = OrientationHelper.rotateRight(this.orientation);
  }

  getNextPosition(): Position {
    switch (this.orientation) {
      case Orientation.North:
        return this.position.moveNorth();
      case Orientation.South:
        return this.position.moveSouth();
      case Orientation.East:
        return this.position.moveEast();
      case Orientation.West:
        return this.position.moveWest();
    }
  }

  moveForward(newPosition: Position): void {
    this.position = newPosition;
  }
}
