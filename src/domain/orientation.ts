export enum Orientation {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export class OrientationHelper {
  private static readonly SEQUENCE: Orientation[] = [
    Orientation.North,
    Orientation.East,
    Orientation.South,
    Orientation.West,
  ];

  static rotateLeft(current: Orientation): Orientation {
    const idx = this.SEQUENCE.indexOf(current);
    return this.SEQUENCE[
      (idx - 1 + this.SEQUENCE.length) % this.SEQUENCE.length
    ];
  }

  static rotateRight(current: Orientation): Orientation {
    const idx = this.SEQUENCE.indexOf(current);
    return this.SEQUENCE[(idx + 1) % this.SEQUENCE.length];
  }
}
