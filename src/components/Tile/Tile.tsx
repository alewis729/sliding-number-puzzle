import React from 'react';
import { isNil } from 'lodash';
import { Typography } from '@material-ui/core';
import { motion, PanInfo, useCycle } from 'framer-motion';

import { switchablePositions, swapDirection } from 'src/lib/utils';
import { Position, Direction } from 'src/lib/types';

interface TileProps {
  className?: string;
  content?: number | React.ReactNode;
  size: number;
  currentPos: Position;
  emptyPos: Position | null;
  onGridUpdate: (currentPos: Position) => void;
}

const defaultConstraints = { left: 0, right: 0, top: 0, bottom: 0 };
const axisDistance = (direction: Direction, distance: number) =>
  distance * (['top', 'left'].includes(direction as string) ? -1 : 1);

const Tile: React.FC<TileProps> = ({
  className,
  content,
  size,
  currentPos,
  emptyPos,
  onGridUpdate
}) => {
  const [cycleValue, doCycle] = useCycle(0, -size, size);
  const direction = React.useMemo<Direction>(
    () => swapDirection(currentPos, emptyPos as Position) as Direction,
    [currentPos, emptyPos]
  );
  const axis = React.useMemo(
    () => (['left', 'right'].includes(direction) ? 'x' : 'y'),
    [direction]
  );
  const maxTranslate = axisDistance(direction, size);
  const drag = !isNil(emptyPos) && switchablePositions(currentPos, emptyPos);
  const motionProps = {
    animate: { [axis]: cycleValue },
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.075 },
    drag,
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
      const traveledDistance = axisDistance(direction, offset);
      const shouldUpdateTilePosition = traveledDistance / size >= 0.35;

      if (shouldUpdateTilePosition) {
        const nextCycleValueIndex = ['right', 'bottom'].includes(direction)
          ? 2
          : 1;

        doCycle(nextCycleValueIndex);
        setTimeout(() => onGridUpdate(currentPos), 75);
      } else {
        doCycle();
        doCycle(0);
      }
    }
  };

  return (
    <motion.div className={className} {...(drag && motionProps)}>
      <Typography>{content}</Typography>
    </motion.div>
  );
};

export default Tile;
