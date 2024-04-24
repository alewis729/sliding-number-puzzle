import React from 'react';
import { isNil } from 'lodash';
import { Typography } from '@material-ui/core';
import { motion, PanInfo, useCycle } from 'framer-motion';

import { useStyles } from './style';
import { switchablePositions, swapDirection } from 'src/lib/utils';
import { Position, Direction } from 'src/lib/types';
import clsx from 'clsx';

interface TileProps {
  className?: string;
  content?: number | React.ReactNode;
  size: number;
  emptyPos: Position | null;
  currentPos: Position;
  onGridUpdate: (currentPos: Position) => void;
}

const defaultConstraints = { left: 0, right: 0, top: 0, bottom: 0 };
const getAxisDistance = (direction: Direction, distance: number) =>
  distance * (['top', 'left'].includes(direction as string) ? -1 : 1);

const Tile: React.FC<TileProps> = ({
  className,
  content,
  size,
  emptyPos,
  currentPos,
  onGridUpdate
}) => {
  const classes = useStyles();
  const [cycleValue, doCycle] = useCycle(0, -size, size);
  const direction = React.useMemo<Direction>(
    () => swapDirection(currentPos, emptyPos as Position) as Direction,
    [currentPos, emptyPos]
  );
  const axis = React.useMemo(
    () => (['left', 'right'].includes(direction) ? 'x' : 'y'),
    [direction]
  );
  const [clickPos, setClickPos] = React.useState<Position>([0, 0]);
  const maxTranslate = getAxisDistance(direction, size);
  const isDraggable =
    !isNil(emptyPos) && switchablePositions(currentPos, emptyPos);

  const updateTilePosition = () => {
    const nextCycleValueIndex = ['right', 'bottom'].includes(direction) ? 2 : 1;
    doCycle(nextCycleValueIndex);
    setTimeout(() => onGridUpdate(currentPos), 75);
  };

  const motionProps = {
    animate: { [axis]: cycleValue },
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.075 },
    drag: isDraggable,
    dragDirectionLock: true,
    dragElastic: false,
    dragMomentum: false,
    dragConstraints: isNil(direction)
      ? defaultConstraints
      : { ...defaultConstraints, [direction]: maxTranslate },
    onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = ['top', 'bottom'].includes(direction)
        ? info.offset.y
        : info.offset.x;
      const traveledDistance = getAxisDistance(direction, offset);
      const shouldUpdateTilePosition = traveledDistance / size >= 0.35;

      if (shouldUpdateTilePosition) {
        updateTilePosition();
      } else {
        doCycle();
        doCycle(0);
      }
    },
    onPointerDown: (e: React.PointerEvent<Element>) =>
      setClickPos([e.pageX, e.pageY]),
    onPointerUp: (e: React.PointerEvent<Element>) => {
      const currentMousePos: Position = [e.pageX, e.pageY];
      const diffX = currentMousePos[0] - clickPos[0];
      const diffY = currentMousePos[1] - clickPos[1];
      const DELTA = 10;
      // This detects click vs drag. true = drag; false = click;
      const hasLowMousePositionVariation =
        (direction === 'bottom' && diffY > DELTA) ||
        (direction === 'top' && diffY <= -DELTA) ||
        (direction === 'left' && diffX <= -DELTA) ||
        (direction === 'right' && diffX > DELTA);

      if (!hasLowMousePositionVariation) {
        updateTilePosition();
      }
      setClickPos([0, 0]);
    },
    onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        [13, 32].includes(e?.keyCode) ||
        [' ', 'Enter', 'NumpadEnter'].includes(e.key)
      ) {
        updateTilePosition();
      }
    }
  };

  return (
    <motion.div
      tabIndex={0}
      className={clsx(className, classes.tile)}
      {...(isDraggable && motionProps)}
    >
      <Typography>{content}</Typography>
      <img
        src="/assets/wood-frame-min.png"
        alt="wood"
        className={classes.image}
      />
    </motion.div>
  );
};

export default Tile;
