import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    height: "100vh",
    background: theme.palette.secondary.dark,
    transition: "all .35s ease"
  },
  greenBg: {
    backgroundColor: theme.palette.success.dark
  },
  settings: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(8),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2)
    }
  },
  selectContainer: {
    minWidth: 120
  },
  mainContent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4)
  }
}));
