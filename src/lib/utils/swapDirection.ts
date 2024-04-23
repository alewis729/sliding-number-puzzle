import { Position, Direction } from 'src/lib/types';

type SwapDirection = Direction | null;
type GetSwapDirection = (
  currentPos: Position,
  emptyPos: Position
) => SwapDirection;

const swapDirection: GetSwapDirection = (currentPos, emptyPos) => {
  const validPositions = [
    { pos: [emptyPos[0] - 1, emptyPos[1]], direction: 'bottom' },
    { pos: [emptyPos[0] + 1, emptyPos[1]], direction: 'top' },
    { pos: [emptyPos[0], emptyPos[1] - 1], direction: 'right' },
    { pos: [emptyPos[0], emptyPos[1] + 1], direction: 'left' }
  ];

  for (let i = 0; i < validPositions.length; i++) {
    const { pos, direction } = validPositions[i];

    if (pos[0] === currentPos[0] && pos[1] === currentPos[1]) {
      return direction as SwapDirection;
    }
  }

  return null;
};

export default swapDirection;
