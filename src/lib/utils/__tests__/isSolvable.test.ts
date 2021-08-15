import { isSolvable } from "src/lib/utils";
import { Grid } from "src/lib/types";

const solvableGrids: Grid[] = [
  [
    [1, 2],
    [0, 3]
  ],
  [
    [6, 2, 1],
    [3, 5, 0],
    [8, 7, 4]
  ],
  [
    [1, 4, 7],
    [3, 0, 2],
    [8, 6, 5]
  ],
  [
    [5, 1, 6],
    [2, 8, 4],
    [7, 3, 0]
  ],
  [
    [8, 0, 2],
    [4, 1, 7],
    [6, 5, 3]
  ],
  [
    [3, 1, 8],
    [0, 2, 5],
    [7, 4, 6]
  ],
  [
    [3, 1, 2, 11],
    [9, 7, 6, 8],
    [12, 13, 0, 14],
    [15, 5, 10, 4]
  ]
];

const unsolvableGrids: Grid[] = [
  [
    [1, 0],
    [2, 3]
  ],
  [
    [3, 2],
    [0, 1]
  ],
  [
    [1, 5, 6],
    [3, 2, 7],
    [8, 0, 4]
  ],
  [
    [1, 7, 3],
    [0, 5, 2],
    [6, 4, 8]
  ],
  [
    [7, 0, 2],
    [1, 5, 3],
    [8, 4, 6]
  ],
  [
    [8, 6, 4],
    [3, 2, 0],
    [5, 1, 7]
  ],
  [
    [0, 7, 3],
    [6, 4, 5],
    [2, 1, 8]
  ],
  [
    [7, 2, 9, 1],
    [13, 4, 10, 12],
    [5, 14, 15, 6],
    [8, 11, 0, 3]
  ]
];

it("should return true for solvable grids", () => {
  for (const grid of solvableGrids) {
    expect(isSolvable(grid)).toBe(true);
  }
});

it("should return false for unsolvable grids", () => {
  for (const grid of unsolvableGrids) {
    expect(isSolvable(grid)).toBe(false);
  }
});
