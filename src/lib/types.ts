export type Cell = number;
export type Grid = Cell[][];
export type Position = [number, number];
export type Direction = "top" | "right" | "bottom" | "left";
export interface Settings {
  gridSize?: number;
  theme?: "dark" | "light";
  startNewGame?: boolean;
}
