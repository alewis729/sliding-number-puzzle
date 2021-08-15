import React from "react";
import { Button } from "@material-ui/core";

import { useStyles } from "./style";
import { Settings as S } from "src/lib/types";

interface SettingsProps {
  updateSettings: (settings: S) => void;
}

const Settings: React.FC<SettingsProps> = ({ updateSettings }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        onClick={() => updateSettings({ startNewGame: true })}
        variant="contained"
      >
        Start a new game
      </Button>
    </div>
  );
};

export default Settings;
