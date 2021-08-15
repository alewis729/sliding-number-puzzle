import { getGrid, isSolvable, isGridOrdered } from "src/lib/utils";
import { GetGrid } from "src/lib/utils/getGrid";

const getSolvableGrid: GetGrid = (size, solved) => {
  let grid = getGrid(size, solved);

  while (!isSolvable(grid) || isGridOrdered(grid)) {
    grid = getGrid(size, solved);
  }

  return grid;
};

export default getSolvableGrid;
