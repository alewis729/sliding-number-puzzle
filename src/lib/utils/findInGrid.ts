import { Grid, Position } from "src/lib/types";

type FindInGrid = (grid: Grid, cell: number) => Position | null;

const findInGrid: FindInGrid = (grid, cell) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];

    if (!row.includes(cell)) {
      continue;
    }

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (row[colIndex] === cell) {
        return [rowIndex, colIndex];
      }
    }
  }

  return null;
};

export default findInGrid;
