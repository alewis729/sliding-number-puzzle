import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { theme } from "src/lib/theme";
import { Home } from "src/pages";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Home />
  </ThemeProvider>
);

export default App;
