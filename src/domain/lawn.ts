import { Position } from './position';

export class Lawn {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {}

  isWithinBounds(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x <= this.width &&
      position.y >= 0 &&
      position.y <= this.height
    );
  }
}
