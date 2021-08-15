import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(4)
  },
  mainContent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4)
  }
}));
