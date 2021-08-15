import { getGrid, isGridOrdered } from "src/lib/utils";

const cases = [2, 3, 4, 5, 6, 7, 8];

it("should return a grid with the given amount of rows", () => {
  for (const size of cases) {
    const grid = getGrid(size);
    expect(grid).toHaveLength(size);
  }
});

it("should return a grid with the given amount of columns", () => {
  for (const size of cases) {
    const grid = getGrid(size);

    for (const row of grid) {
      expect(row).toHaveLength(size);
    }
  }
});

it("should return a solved grid", () => {
  for (const size of cases) {
    const grid = getGrid(size, true);
    expect(isGridOrdered(grid)).toBe(true);
  }
});
