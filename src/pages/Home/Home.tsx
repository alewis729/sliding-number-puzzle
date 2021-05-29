import React from "react";
import { isNil, map } from "lodash";
import { v4 as uuid } from "uuid";
import { Paper, Typography } from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";
import {
  getRandomGrid,
  isGridOrdered,
  findInGrid,
  switchablePositions
} from "src/lib/utils";
import { Grid, Position } from "src/lib/types";

const gridSize = 3;
const initialGrid = getRandomGrid(gridSize);

const Home: React.FC = () => {
  const classes = useStyles({ gridSize });
  const [grid, setGrid] = React.useState<Grid>(initialGrid);
  const isOrdered = React.useMemo(() => isGridOrdered(grid), [grid]);

  React.useEffect(() => {
    if (isOrdered) {
      console.log("you won!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrdered]);

  const updateGrid = (rowIndex: number, colIndex: number) => {
    const cell = grid[rowIndex][colIndex];
    const currentPos = [rowIndex, colIndex] as Position;
    const emptyPos = findInGrid(grid, 0);

    if (isNil(emptyPos) || !switchablePositions(currentPos, emptyPos)) {
      return;
    }

    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = 0;
    newGrid[emptyPos[0]][emptyPos[1]] = cell;
    setGrid([...newGrid]);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <div className={classes.grid}>
          {map(grid, (row, rowIndex) =>
            map(row, (cell, colIndex) => (
              <div
                key={uuid()}
                className={clsx(classes.cell, {
                  [`${classes.cell}--empty`]: cell === 0
                })}
                onClick={() => updateGrid(rowIndex, colIndex)}
              >
                <Typography>{cell}</Typography>
              </div>
            ))
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Home;
