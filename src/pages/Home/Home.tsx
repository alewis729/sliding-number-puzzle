import React from "react";
import { isNil, map } from "lodash";
import { v4 as uuid } from "uuid";
import { Paper } from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";
import { Tile } from "src/components";
import {
  getRandomGrid,
  isGridOrdered,
  findInGrid,
  switchablePositions
} from "src/lib/utils";
import { Grid, Position } from "src/lib/types";

const gridSize = 3;
const tileSize = 150;
const initialGrid = getRandomGrid(gridSize);

const Home: React.FC = () => {
  const classes = useStyles({ gridSize, tileSize });
  const [grid, setGrid] = React.useState<Grid>(initialGrid);
  const isOrdered = React.useMemo(() => isGridOrdered(grid), [grid]);
  const emptyPos = React.useMemo(() => findInGrid(grid, 0), [grid]);

  React.useEffect(() => {
    if (isOrdered) {
      console.log("you won!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrdered]);

  const updateGrid = (currentPos: Position) => {
    const [rowIndex, colIndex] = currentPos;
    const cell = grid[rowIndex][colIndex];

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
              <Tile
                key={uuid()}
                className={clsx(classes.cell, {
                  [classes.emptyTile]: cell === 0
                })}
                content={cell}
                size={tileSize}
                currentPos={[rowIndex, colIndex]}
                emptyPos={emptyPos}
                onGridUpdate={updateGrid}
              />
            ))
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Home;
