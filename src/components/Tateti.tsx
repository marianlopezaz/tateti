import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  getGameState,
  newMovement,
  resetGame,
  startNewGame,
} from "../utils/api";
import GameResult from "./GameResult";
import styles from "./styles.module.css";

export const Tateti = ({ resetGame }: { resetGame: any }) => {
  const [matrix, setMatrix] = useState<(0 | 1 | null)[][]>([[]]);
  const [gameId, setGameId] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [player2, setPlayer2] = useState<number | null>(null);
  const [winner, setWinner] = useState<0 | 1 | null | 9>(null);

  const handleResetGame = () => {
    void resetGame(gameId);
    resetGame();
  };

  const getmatrixState = (row: number, col: number) => {
    const player: 0 | 1 | null = matrix[row][col];
    const sym = { 0: "X", 1: "0" };
    return player !== null ? sym[player] : "";
  };

  const handleNewMovement = (row: any, col: any) => {
    const data = {
      playerId: playerId,
      movement: [row, col],
      gameId: gameId,
    };
    newMovement({ ...data });
  };

  useEffect(() => {
    startNewGame().then((res: any) => {
      const { id, board, currentPlayer } = res.game;
      setMatrix(JSON.parse(board));
      setGameId(id);
      setCurrentPlayer(parseInt(currentPlayer));
      console.log(res.playerID);
      setPlayerId(parseInt(res.playerID));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameId) {
        getGameState(gameId).then((result) => {
          const { board, currentPlayer, player_id2 } = result.game;
          if (!player2) {
            setPlayer2(parseInt(player_id2));
          }
          setMatrix(JSON.parse(board));
          setCurrentPlayer(parseInt(currentPlayer));
          setWinner(result.winner);
        });
      }
    }, 100);
    return () => console.log("cerrando intervalo", interval);
  }, [gameId]);

  return (
    <>
      {player2 ? (
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
      ) : (
        "Esperando a un jugador"
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
