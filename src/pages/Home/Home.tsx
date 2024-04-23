import React from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { map } from 'lodash';

import { useStyles } from './style';
import { Board } from 'src/components';
import { useWindowDimensions } from 'src/hooks';

const DEFAULT_GRID_SIZE = 3;
const DEFAULT_TILE_SIZE = 175;

const Home: React.FC = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState<number>(DEFAULT_GRID_SIZE);
  const [gridSize, setGridSize] = React.useState<number>(DEFAULT_GRID_SIZE);
  const [isOrdered, setIsOrdered] = React.useState<boolean>(false);
  const [tileSize, setTileSize] = React.useState<number>(DEFAULT_TILE_SIZE);
  const windowDimensions = useWindowDimensions(100);
  const [shouldStartAgain, setShouldStartAgain] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const gridLength = gridSize * tileSize;
    const maxWidth = windowDimensions.width - 40;
    const newTileSize = maxWidth / gridSize;

    if (maxWidth < gridLength || maxWidth / 2.5 > gridLength) {
      if (newTileSize < DEFAULT_TILE_SIZE) {
        setTileSize(newTileSize);
      } else {
        setTileSize(DEFAULT_TILE_SIZE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDimensions, gridSize]);

  const handleStartNewGame = () => {
    setShouldStartAgain(true);
    setTimeout(() => {
      setGridSize(inputValue);
      setShouldStartAgain(false);
      setIsOrdered(false);
    }, 500);
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.greenBg]: isOrdered
      })}
    >
      {isOrdered && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
          gravity={0.325}
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
      <div className={classes.settings}>
        <FormControl variant="outlined" className={classes.selectContainer}>
          <InputLabel id="grid-size-select">Grid size</InputLabel>
          <Select
            labelId="grid-size-select"
            label="Grid size"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          >
            {map([3, 4, 5, 6], (option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleStartNewGame} variant="contained" size="large">
          New game
        </Button>
      </div>
      <div className={classes.mainContent}>
        <AnimatePresence>
          {!shouldStartAgain && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Board
                tileSize={tileSize}
                gridSize={gridSize}
                updateGameStatus={({ isOrdered }) => setIsOrdered(isOrdered)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
