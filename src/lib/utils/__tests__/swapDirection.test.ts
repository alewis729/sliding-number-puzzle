import { swapDirection } from "src/lib/utils";
import { Position, Direction } from "src/lib/types";

type Case = {
  currentPos: Position;
  emptyPos: Position;
  direction: Direction | null;
};

const cases: Case[] = [
  { currentPos: [0, 1], emptyPos: [0, 0], direction: "left" },
  { currentPos: [4, 3], emptyPos: [4, 2], direction: "left" },
  { currentPos: [0, 0], emptyPos: [1, 0], direction: "bottom" },
  { currentPos: [2, 2], emptyPos: [2, 3], direction: "right" },
  { currentPos: [2, 2], emptyPos: [3, 5], direction: null }
];

it("should return the correct swap direction", () => {
  for (const { currentPos, emptyPos, direction } of cases) {
    expect(swapDirection(currentPos, emptyPos)).toEqual(direction);
  }
});
