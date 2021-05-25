import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";

const INITIAL_STATE: (0 | 1 | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const TatetiComponent = () => {
  const winnerNumbers = [
    273, 7, 56, 448, 84, 73, 337, 135, 146, 147, 150, 292, 210, 15, 281, 302,
    201, 205, 203, 307, 39, 263, 420, 464, 294, 428, 402, 409, 89, 86, 329,
  ];
  const [matrix, setMatrix] = useState(INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0);
  const [winner, setWinner] = useState<any>(null);
  const [movesCount, setMovesCount] = useState<number>(0);

  const getmatrixState = (row: number, col: number) => {
    const player: 0 | 1 | null = matrix[row][col];
    const sym = { 0: "X", 1: "0" };
    return player !== null ? sym[player] : "";
  };

  const checkForWinner = () => {
    let valueToCount = currentPlayer;
    let binaryState: number[] = [];
    matrix.forEach((row) => {
      row.forEach((colValue) => {
        binaryState.unshift(valueToCount === colValue ? 1 : 0);
      });
    });
    let matrixNumber = parseInt(binaryState.join(""), 2);
    console.log(matrixNumber);
    if (winnerNumbers.includes(matrixNumber)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const setmatrixState = (row: number, col: number) => {
    if (matrix[row][col] === null && winner === null && movesCount <= 9) {
      let newMatrix = [...matrix];
      newMatrix[row][col] = currentPlayer;
      setMatrix(newMatrix);
      setMovesCount(movesCount + 1);
      checkForWinner();
    }
  };

  const handleResetGame = () => {
    setMatrix([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setWinner(null);
    setCurrentPlayer(0);
    setMovesCount(0);
  };

  return (
    <>
      {winner !== null ? (
        <h2>El ganador es el jugador {currentPlayer + 1}</h2>
      ) : movesCount === 9 ? (
        <h2>Juego terminado - EMPATE</h2>
      ) : (
        <h2>Turno del jugador: {currentPlayer + 1}</h2>
      )}

      {matrix.map((row, rowI) => {
        return (
          <Row key={rowI} className={styles.tateti_row}>
            {row.map((_, colI) => {
              return (
                <Col
                  className={styles.tateti_col}
                  key={colI + "col"}
                  onClick={() => {
                    setmatrixState(rowI, colI);
                  }}
                >
                  {getmatrixState(rowI, colI)}
                </Col>
              );
            })}
          </Row>
        );
      })}
      {(movesCount === 9 || winner !== null) && (
        <button className={styles.reset_button} onClick={handleResetGame}>
          Volver a jugar
        </button>
      )}
    </>
  );
};

export default TatetiComponent;
