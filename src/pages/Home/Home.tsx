import React from "react";
import Confetti from "react-confetti";

import { useStyles } from "./style";
import { Board, Settings as SettingsComp } from "src/components";
import { Settings as S } from "src/lib/types";

const Home: React.FC = () => {
  const classes = useStyles();
  const [isOrdered, setIsOrdered] = React.useState(false);
  const [shouldStartAgain, setShouldStartAgain] = React.useState(false);

  const handleSettingsUpdate = ({ startNewGame }: S) => {
    if (startNewGame) {
      console.log({ status: "start again" });
      setShouldStartAgain(true);
      setTimeout(() => setShouldStartAgain(false), 3000);
    }
  };

  return (
    <div className={classes.root}>
      {isOrdered && (
        <Confetti recycle={false} numberOfPieces={400} gravity={0.125} />
      )}
      <SettingsComp updateSettings={handleSettingsUpdate} />
      <div className={classes.mainContent}>
        <Board
          updateGameStatus={({ isOrdered }) => setIsOrdered(isOrdered)}
          shouldStartAgain={shouldStartAgain}
        />
      </div>
    </div>
  );
};

export default Home;
