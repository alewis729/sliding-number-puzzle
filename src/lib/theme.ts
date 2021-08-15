import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions
} from "@material-ui/core/styles";

const options: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#DDC6B1"
    },
    secondary: {
      dark: "#251C14",
      main: "#5D4632",
      light: "#AE8A69"
    }
  }
};

export const theme = responsiveFontSizes(createMuiTheme(options));
