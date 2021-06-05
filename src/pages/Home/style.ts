import { makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  gridSize: number;
  tileSize: number;
}

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(4)
  },
  grid: ({ gridSize }: Props) => ({
    display: "grid",
    gridTemplateRows: `repeat(${gridSize}, ${100 / gridSize}%)`,
    gridTemplateColumns: `repeat(${gridSize}, ${100 / gridSize}%)`
  }),
  cell: {
    width: ({ tileSize }: Props) => tileSize,
    height: ({ tileSize }: Props) => tileSize,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #fff",
    "&:hover": {
      cursor: "pointer"
    }
  },
  emptyTile: {
    visibility: "hidden"
  }
}));
