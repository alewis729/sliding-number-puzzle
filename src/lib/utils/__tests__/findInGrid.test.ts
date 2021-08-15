import { findInGrid } from "src/lib/utils";
import { Grid, Position } from "src/lib/types";

type Case = {
  grid: Grid;
  cell: number;
  position: Position | null;
};

const cases: Case[] = [
  {
    grid: [
      [1, 3],
      [0, 2]
    ],
    cell: 0,
    position: [1, 0]
  },
  {
    grid: [
      [1, 3, 4],
      [0, 2, 5],
      [6, 7, 8]
    ],
    cell: 9,
    position: null
  },
  {
    grid: [
      [1, 3, 4],
      [0, 2, 5],
      [6, 7, 8]
    ],
    cell: 7,
    position: [2, 1]
  },
  {
    grid: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 0, 24]
    ],
    cell: 13,
    position: [2, 2]
  },
  {
    grid: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 0, 24]
    ],
    cell: 0,
    position: [4, 3]
  },
  {
    grid: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 0, 24]
    ],
    cell: 47,
    position: null
  }
];

it("should find the position of a cell in a grid", () => {
  for (const { grid, cell, position } of cases) {
    expect(findInGrid(grid, cell)).toEqual(position);
  }
});
