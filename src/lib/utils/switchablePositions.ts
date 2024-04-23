import { Position } from 'src/lib/types';

type SwitchablePositions = (
  currentPos: Position,
  emptyPos: Position
) => boolean;

const switchablePositions: SwitchablePositions = (currentPos, emptyPos) => {
  const validPositions = [
    [emptyPos[0] - 1, emptyPos[1]],
    [emptyPos[0] + 1, emptyPos[1]],
    [emptyPos[0], emptyPos[1] - 1],
    [emptyPos[0], emptyPos[1] + 1]
  ];

  for (const validPos of validPositions) {
    if (validPos[0] === currentPos[0] && validPos[1] === currentPos[1]) {
      return true;
    }
  }

  return false;
};

export default switchablePositions;
