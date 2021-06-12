import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import Tateti from "./Tateti";

const StartGame = () => {
  const [game, setGame] = useState<boolean>();

  return game ? (
    <Tateti resetGame={() => setGame(false)} />
  ) : (
    <Button className={styles.button} onClick={() => setGame(true)}>
      Comenzar juego nuevo
    </Button>
  );
};

export default StartGame;
