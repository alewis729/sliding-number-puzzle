import { makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  gridSize: number;
  tileSize: number;
}

const getGridStyles = (gridSize: number) => ({
  display: "grid",
  gridTemplateRows: `repeat(${gridSize}, ${100 / gridSize}%)`,
  gridTemplateColumns: `repeat(${gridSize}, ${100 / gridSize}%)`
});

export const useStyles = makeStyles((theme: Theme) => ({
  grid: ({ gridSize }: Props) => ({
    position: "relative",
    ...getGridStyles(gridSize)
  }),
  innerGrid: ({ gridSize }: Props) => ({
    position: "absolute",
    pointerEvents: "none",
    ...getGridStyles(gridSize),
    "& > *": {
      border: `1px solid ${theme.palette.text.primary}`,
      width: ({ tileSize }: Props) => tileSize,
      height: ({ tileSize }: Props) => tileSize
    }
  }),
  cell: {
    backgroundColor: theme.palette.background.paper,
    width: ({ tileSize }: Props) => tileSize,
    height: ({ tileSize }: Props) => tileSize,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.text.primary}`,
    userSelect: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  emptyTile: {
    visibility: "hidden"
  }
}));
