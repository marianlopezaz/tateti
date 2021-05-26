import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { newMovement, resetGame, startNewGame } from "../utils/api";
import GameResult from "./GameResult";
import styles from "./styles.module.css";

export const Tateti = () => {
  const [matrix, setMatrix] = useState<(0 | 1 | null)[][]>([[]]);
  const [gameId, setGameId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [player1, setPlayer1] = useState<number | null>(null);
  const [player2, setPlayer2] = useState<number | null>(null);
  const [winner, setWinner] = useState<0 | 1 | null | 9>(null);

  const handleResetGame = () => {
    resetGame(gameId).then((res) => {
      setMatrix([[]]);
      setWinner(null);
    });
  };

  const getmatrixState = (row: number, col: number) => {
    const player: 0 | 1 | null = matrix[row][col];
    const sym = { 0: "X", 1: "0" };
    return player !== null ? sym[player] : "";
  };

  const handleNewMovement = (row: any, col: any) => {
    const data = {
      playerId: currentPlayer,
      movement: [row, col],
      gameId: gameId,
    };
    newMovement({ ...data }).then((res) => {
      if (res.board) {
        setMatrix(res.board);
        setCurrentPlayer(currentPlayer === 0 ? player2 : player1);
        setWinner(res.winner);
      }
    });
  };

  const startGame = () => {
    startNewGame().then((res: any) => {
      const { id, board, player_id1, player_id2 } = res;
      setMatrix(JSON.parse(board));
      setGameId(id);
      setCurrentPlayer(parseInt(player_id1));
      setPlayer1(parseInt(player_id1));
      setPlayer2(parseInt(player_id2));
    });
  };

  return (
    <>
      {matrix.length === 1 ? (
        <Button className={styles.button} onClick={startGame}>
          Comenzar juego nuevo
        </Button>
      ) : (
        <>
          <GameResult result={winner} currentPlayer={currentPlayer} />
          {matrix.map((row, rowI) => {
            return (
              <Row key={rowI} className={styles.tateti_row}>
                {row.map((_, colI) => {
                  return (
                    <Col
                      className={styles.tateti_col}
                      key={colI + "col"}
                      onClick={() => {
                        handleNewMovement(rowI, colI);
                      }}
                    >
                      {getmatrixState(rowI, colI)}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </>
      )}
      {winner != null && (
        <button className={styles.reset_button} onClick={handleResetGame}>
          Volver a jugar
        </button>
      )}
    </>
  );
};

export default Tateti;
