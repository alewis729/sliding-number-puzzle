import { shuffle, range, reduce } from "lodash";

import { Grid } from "src/lib/types";

type GetRandomGrid = (size: number) => Grid;

const getRandomGrid: GetRandomGrid = (size) =>
  reduce(
    shuffle(range(0, size * size)),
    (grid, cell, index) => {
      if (grid[grid.length - 1].length === size) {
        return [...grid, [cell]];
      }

      const newGrid = [...grid];
      newGrid[newGrid.length - 1].push(cell);

      return newGrid;
    },
    [[]] as Grid
  );

export default getRandomGrid;
