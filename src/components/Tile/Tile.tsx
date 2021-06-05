import React from "react";
import { isNil } from "lodash";
import { Typography } from "@material-ui/core";
import { motion, MotionProps, PanInfo } from "framer-motion";

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

const defaultConstraints = { left: 0, right: 0, top: 0, bottom: 0 };
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
  const axis = React.useMemo(
    () => (["left", "right"].includes(direction) ? "x" : "y"),
    [direction]
  );
  const maxTranslate = axisDistance(direction, size);
  const variants = {
    start: { [axis]: 0 },
    end: { [axis]: maxTranslate }
  };
  const [animationVariant, setAnimationVariant] = React.useState(
    variants.start
  );
  const motionProps = React.useMemo<MotionProps>(() => {
    const drag = !isNil(emptyPos) && switchablePositions(currentPos, emptyPos);

    return !drag
      ? {}
      : {
          // animate: animationVariant,
          // style: {[axis]: translate},
          // transition: { type: "tween", ease: "easeInOut", duration: 0.25 },
          drag,
          dragDirectionLock: true,
          // dragElastic: false,
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
            // console.log({ direction, offset, info, offsetX, offsetY });

            if (offset / size >= 0.45) {
              setAnimationVariant(variants.end);
              console.log("translate: 100%");
            } else {
              setAnimationVariant(variants.start);
              console.log("translate: 0");
            }

            // setTimeout(() => {
            onGridUpdate(currentPos);
            // }, 100);
          }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPos, emptyPos, animationVariant, direction]);

  return (
    <motion.div className={className} {...motionProps}>
      <Typography>{content}</Typography>
    </motion.div>
  );
};

export default Tile;
