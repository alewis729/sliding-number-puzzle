import { getSolvableGrid, isSolvable } from 'src/lib/utils';

const cases = [2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8];

it('should return a solvable grid', () => {
  for (const size of cases) {
    const grid = getSolvableGrid(size);
    expect(isSolvable(grid)).toBe(true);
  }
});
