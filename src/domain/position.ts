export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toKey(): string {
    return `${this.x},${this.y}`;
  }

  moveNorth(): Position {
    return new Position(this.x, this.y + 1);
  }

  moveSouth(): Position {
    return new Position(this.x, this.y - 1);
  }

  moveEast(): Position {
    return new Position(this.x + 1, this.y);
  }

  moveWest(): Position {
    return new Position(this.x - 1, this.y);
  }
}
