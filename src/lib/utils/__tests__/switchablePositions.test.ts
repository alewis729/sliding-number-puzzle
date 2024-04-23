import { switchablePositions } from 'src/lib/utils';
import { Position } from 'src/lib/types';

type Case = {
  currentPos: Position;
  emptyPos: Position;
};

const validCases: Case[] = [
  { currentPos: [0, 1], emptyPos: [0, 0] },
  { currentPos: [4, 3], emptyPos: [4, 2] },
  { currentPos: [0, 0], emptyPos: [1, 0] },
  { currentPos: [2, 2], emptyPos: [3, 2] }
];

const invalidCases: Case[] = [
  { currentPos: [0, 1], emptyPos: [3, 4] },
  { currentPos: [2, 2], emptyPos: [2, 2] },
  { currentPos: [0, 3], emptyPos: [5, 6] },
  { currentPos: [4, 0], emptyPos: [2, 4] }
];

it('should return true for positions that are switchable', () => {
  for (const { currentPos, emptyPos } of validCases) {
    expect(switchablePositions(currentPos, emptyPos)).toBe(true);
  }
});

it('should return false for positions that are not switchable', () => {
  for (const { currentPos, emptyPos } of invalidCases) {
    expect(switchablePositions(currentPos, emptyPos)).toBe(false);
  }
});
