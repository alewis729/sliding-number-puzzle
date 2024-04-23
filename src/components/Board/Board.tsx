import React from 'react';
import { isNil, map } from 'lodash';
import { v4 as uuid } from 'uuid';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Tile } from 'src/components';
import {
  getSolvableGrid,
  isGridOrdered,
  findInGrid,
  switchablePositions
} from 'src/lib/utils';
import { Grid, Position } from 'src/lib/types';

interface BoardProps {
  gridSize?: number;
  tileSize?: number;
  updateGameStatus: ({ isOrdered }: { isOrdered: boolean }) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const { gridSize = 3, tileSize = 150, updateGameStatus } = props;
  const [grid, setGrid] = React.useState<Grid>(getSolvableGrid(gridSize));
  const isOrdered = React.useMemo(() => isGridOrdered(grid), [grid]);
  const emptyPos = React.useMemo(() => findInGrid(grid, 0), [grid]);
  const classes = useStyles({ gridSize, tileSize });

  React.useEffect(() => {
    if (isOrdered) {
      updateGameStatus({ isOrdered });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrdered]);

  const handleGridUpdate = (currentPos: Position) => {
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
    <Paper
      square
      className={clsx(classes.paper, { [classes.paperOrdered]: isOrdered })}
    >
      <div className={classes.grid}>
        {map(grid, (row, rowIndex) =>
          map(row, (cell, colIndex) => (
            <Tile
              key={uuid()}
              className={clsx(classes.cell, {
                [classes.emptyTile]: cell === 0,
                [classes.switchable]: switchablePositions(
                  [rowIndex, colIndex],
                  emptyPos as Position
                )
              })}
              content={cell}
              size={tileSize}
              currentPos={[rowIndex, colIndex]}
              emptyPos={emptyPos}
              onGridUpdate={handleGridUpdate}
            />
          ))
        )}
      </div>
    </Paper>
  );
};

export default Board;
