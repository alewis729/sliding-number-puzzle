import React from "react";
import { isNil } from "lodash";
import { Typography } from "@material-ui/core";
import { motion, MotionProps, PanInfo, useCycle } from "framer-motion";

import { switchablePositions, swapDirection } from "src/lib/utils";
import { Position, Direction } from "src/lib/types";

interface Props {
  className?: string;
  content?: number | React.ReactNode;
  size: number;
  currentPos: Position;
  emptyPos: Position | null;
  onGridUpdate: (currentPos: Position) => void;
}

const axisDistance = (direction: Direction, distance: number) =>
  distance * (["top", "left"].includes(direction as string) ? -1 : 1);

const Tile: React.FC<Props> = ({
  className,
  content,
  size,
  currentPos,
  emptyPos,
  onGridUpdate
}) => {
  const direction = React.useMemo<Direction>(
    () => swapDirection(currentPos, emptyPos as Position) as Direction,
    [currentPos, emptyPos]
  );
  const maxTranslate = axisDistance(direction, size);
  const [currentState, cycleState] = useCycle(0, maxTranslate);
  const motionProps = React.useMemo<MotionProps>(() => {
    const drag = !isNil(emptyPos) && switchablePositions(currentPos, emptyPos);
    const defaultConstraints = { left: 0, right: 0, top: 0, bottom: 0 };
    const axis = ["left", "right"].includes(direction) ? "x" : "y";

    return !drag
      ? {}
      : {
          animate: { [axis]: currentState },
          transition: { type: "tween", ease: "easeInOut", duration: 0.25 },
          // dragTransition: { type: "inertia", min: 0, max: maxTranslate },
          drag,
          dragDirectionLock: true,
          dragElastic: false,
          // dragMomentum: false,
          dragConstraints: isNil(direction)
            ? defaultConstraints
            : { ...defaultConstraints, [direction]: maxTranslate },
          onDragEnd: (
            _: MouseEvent | TouchEvent | PointerEvent,
            info: PanInfo
          ) => {
            const offsetX = axisDistance(direction, info.offset.x);
            const offsetY = axisDistance(direction, info.offset.y);
            const offset = ["top", "bottom"].includes(direction)
              ? offsetY
              : offsetX;
            console.log({ direction, offset, info, offsetX, offsetY });

            if (offset / size >= 0.45) {
              cycleState();
            } else {
              cycleState(0);
            }
            // setTimeout(() => {
            //   onGridUpdate(currentPos);
            // }, 100);
          }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPos, emptyPos, currentState, direction]);

  return (
    <motion.div className={className} {...motionProps}>
      <Typography>{content}</Typography>
    </motion.div>
  );
};

export default Tile;
