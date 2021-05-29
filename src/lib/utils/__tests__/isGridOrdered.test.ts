import { isGridOrdered } from "src/lib/utils";
import { Grid } from "src/lib/types";

const orderedGrids: Grid[] = [
  [
    [1, 2],
    [3, 0]
  ],
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ],
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ]
];

const unorderedGrids: Grid[] = [
  [
    [0, 2],
    [3, 1]
  ],
  [
    [1, 0, 3],
    [4, 5, 6],
    [7, 8, 2]
  ],
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 0, 15]
  ],
  [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 0, 24]
  ]
];

it("should validate ordered grids", () => {
  for (const grid of orderedGrids) {
    expect(isGridOrdered(grid)).toBe(true);
  }
});

it("should invalidate unordered grids", () => {
  for (const grid of unorderedGrids) {
    expect(isGridOrdered(grid)).toBe(false);
  }
});
