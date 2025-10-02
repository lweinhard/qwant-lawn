import { Position } from './position';

describe('Position', () => {
  it('should create position with coordinates', () => {
    const pos = new Position(3, 4);
    expect(pos.x).toBe(3);
    expect(pos.y).toBe(4);
  });

  it('should check equality correctly', () => {
    const pos1 = new Position(1, 2);
    const pos2 = new Position(1, 2);
    const pos3 = new Position(2, 1);

    expect(pos1.equals(pos2)).toBe(true);
    expect(pos1.equals(pos3)).toBe(false);
  });

  it('should generate correct key', () => {
    const pos = new Position(3, 7);
    expect(pos.toKey()).toBe('3,7');
  });

  it('should move in all directions', () => {
    const pos = new Position(2, 2);

    expect(pos.moveNorth()).toEqual(new Position(2, 3));
    expect(pos.moveSouth()).toEqual(new Position(2, 1));
    expect(pos.moveEast()).toEqual(new Position(3, 2));
    expect(pos.moveWest()).toEqual(new Position(1, 2));
  });

  it('should maintain immutability', () => {
    const pos = new Position(2, 2);
    const newPos = pos.moveNorth();

    expect(pos.y).toBe(2);
    expect(newPos.y).toBe(3);
  });
});
