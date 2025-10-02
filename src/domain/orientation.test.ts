import { Orientation, OrientationHelper } from './orientation';

describe('OrientationHelper', () => {
  describe('rotateLeft', () => {
    it('should rotate from North to West', () => {
      expect(OrientationHelper.rotateLeft(Orientation.North)).toBe(
        Orientation.West,
      );
    });

    it('should complete full rotation', () => {
      let current = Orientation.North;
      current = OrientationHelper.rotateLeft(current);
      current = OrientationHelper.rotateLeft(current);
      current = OrientationHelper.rotateLeft(current);
      current = OrientationHelper.rotateLeft(current);
      expect(current).toBe(Orientation.North);
    });
  });

  describe('rotateRight', () => {
    it('should rotate from North to East', () => {
      expect(OrientationHelper.rotateRight(Orientation.North)).toBe(
        Orientation.East,
      );
    });

    it('should complete full rotation', () => {
      let current = Orientation.North;
      current = OrientationHelper.rotateRight(current);
      current = OrientationHelper.rotateRight(current);
      current = OrientationHelper.rotateRight(current);
      current = OrientationHelper.rotateRight(current);
      expect(current).toBe(Orientation.North);
    });
  });
});
