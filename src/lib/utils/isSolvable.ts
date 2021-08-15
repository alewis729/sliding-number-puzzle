import { flattenDeep, map, reduce } from "lodash";

import { findInGrid, getGrid } from "src/lib/utils";
import { Grid, Position } from "src/lib/types";

type IsSolvable = (grid: Grid) => boolean;

const isEven = (num: number) => num % 2 === 0;

/**
 * Some positions are simply impossible to solve.
 * Algorithm inspired by https://youtu.be/YI1WqYKHi78
 */
const isSolvable: IsSolvable = (grid) => {
  // 1. find empty cell's step count parity
  const solvedGrid = getGrid(grid.length, true);
  const currentEmptyPos = findInGrid(grid, 0) as Position;
  const finalEmptyPos = findInGrid(solvedGrid, 0) as Position;
  const emptyStepCount =
    Math.abs(currentEmptyPos[0] - finalEmptyPos[0]) +
    Math.abs(currentEmptyPos[1] - finalEmptyPos[1]);

  // 2. make transpositions until final position is reached
  const initialSetup = flattenDeep(grid);
  const finalSetup = flattenDeep(solvedGrid);
  const { stepCount } = reduce(
    initialSetup,
    (obj, _, i) => {
      const { stepCount, setup } = obj;
      const nextInOrder = i + 1;

      // if already in correct position continue
      if (setup[i] === finalSetup[i]) {
        return { stepCount, setup };
      }

      // otherwise make transposition
      const currentIndex = setup.indexOf(nextInOrder);
      const finalIndex = finalSetup.indexOf(nextInOrder);

      return {
        stepCount: stepCount + 1,
        setup: map(setup, (num, j) => {
          if (finalIndex === j) {
            // return setup[currentIndex];
            return nextInOrder;
          } else if (currentIndex === j) {
            return setup[finalIndex];
          }

          return num;
        })
      };
    },
    { stepCount: 0, setup: initialSetup }
  );

  // 3. compare total step count parity to empty cell's step count parity
  return isEven(stepCount) === isEven(emptyStepCount);
};

export default isSolvable;
