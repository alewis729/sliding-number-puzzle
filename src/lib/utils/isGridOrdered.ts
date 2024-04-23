import { range } from 'lodash';

import { Grid } from 'src/lib/types';

const isGridOrdered = (grid: Grid) => {
  const size = grid.length;
  const orderedArr = [...range(1, size * size), 0];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const correctCell = orderedArr[rowIndex * size + colIndex];

      if (correctCell !== row[colIndex]) {
        return false;
      }
    }
  }

  return true;
};

export default isGridOrdered;
