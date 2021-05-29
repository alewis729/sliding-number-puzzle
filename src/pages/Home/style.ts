import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(4)
  },
  grid: ({ gridSize }: { gridSize: number }) => ({
    display: "grid",
    gridTemplateRows: `repeat(${gridSize}, ${100 / gridSize}%)`,
    gridTemplateColumns: `repeat(${gridSize}, ${100 / gridSize}%)`
  }),
  cell: {
    width: 150,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #fff",
    "&:hover": {
      cursor: "pointer"
    },
    "&--empty": {
      visibility: "hidden"
    }
  }
}));
