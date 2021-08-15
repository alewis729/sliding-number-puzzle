import { makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  gridSize: number;
  tileSize: number;
}

const getGridStyles = (gridSize: number) => ({
  display: "grid",
  gridTemplateRows: `repeat(${gridSize}, ${100 / gridSize}%)`,
  gridTemplateColumns: `repeat(${gridSize}, ${100 / gridSize}%)`,
  transition: "all .25s ease"
});

export const useStyles = makeStyles((theme: Theme) => ({
  grid: ({ gridSize, tileSize }: Props) => ({
    position: "relative",
    width: gridSize * tileSize,
    height: gridSize * tileSize,
    ...getGridStyles(gridSize)
  }),
  paper: {
    backgroundColor: theme.palette.secondary.main,
    transition: "all .25s ease"
  },
  paperOrdered: {
    opacity: 0.65,
    pointerEvents: "none"
  },
  cell: {
    backgroundColor: theme.palette.secondary.light,
    width: ({ tileSize }: Props) => tileSize,
    height: ({ tileSize }: Props) => tileSize,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.secondary.main}`,
    userSelect: "none"
  },
  switchable: {
    cursor: "pointer"
  },
  emptyTile: {
    visibility: "hidden"
  }
}));
