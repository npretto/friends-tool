import { formatDistance } from './formatDistance';

describe('formatDistance', () => {
  it('should round to <1km', () => {
    [0, 100, 200, 999].map((distance) => {
      expect(formatDistance(distance)).toBe('less than one km');
    });
  });

  it('should round to km', () => {
    expect(formatDistance(11_111)).toBe('11 km');
    expect(formatDistance(100_999)).toBe('101 km');
  });
});
