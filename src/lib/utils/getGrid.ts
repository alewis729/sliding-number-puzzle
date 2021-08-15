import { shuffle, range, reduce } from "lodash";

import { Grid } from "src/lib/types";

export type GetGrid = (size: number, solved?: boolean) => Grid;

const getGrid: GetGrid = (size, solved = false) => {
  const lastNum = size * size;
  const numbers = solved
    ? [...range(1, lastNum), 0]
    : shuffle(range(0, lastNum));

  return reduce(
    numbers,
    (grid, cell) => {
      if (grid[grid.length - 1].length === size) {
        return [...grid, [cell]];
      }

      const newGrid = [...grid];
      newGrid[newGrid.length - 1].push(cell);

      return newGrid;
    },
    [[]] as Grid
  );
};

export default getGrid;
