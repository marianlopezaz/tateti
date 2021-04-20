import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";

const INITIAL_STATE = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const TatetiComponent = () => {
  const winnerNumbers = [
    273,
    7,
    56,
    448,
    84,
    73,
    146,
    292,
    210,
    15,
    281,
    302,
    201,
    205,
    203,
    307,
  ];
  const [matrix, setMatrix] = useState(INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState<any>(null);
  const [movesCount, setMovesCount] = useState<number>(0);

  const getmatrixState = (row: any, col: any) => {
    let symbol = "";
    switch (matrix[row][col]) {
      case "0":
        symbol = "X";
        break;
      case "1":
        symbol = "0";
        break;
      default:
        symbol = "";
        break;
    }
    return symbol;
  };

  const checkForWinner = () => {
    let valueToCount = currentPlayer.toString();
    let binaryState: number[] = [];
    matrix.forEach((row) => {
      row.forEach((colValue) => {
        binaryState.unshift(valueToCount === colValue ? 1 : 0);
      });
    });
    let matrixNumber = parseInt(binaryState.join(""), 2);
    /*     console.log(matrixNumber); */
    if (winnerNumbers.includes(matrixNumber)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const setmatrixState = (row: number, col: number) => {
    if (matrix[row][col] === "" && winner === null && movesCount <= 9) {
      let newMatrix = [...matrix];
      newMatrix[row][col] = currentPlayer.toString();
      setMatrix(newMatrix);
      setMovesCount(movesCount + 1);
      checkForWinner();
    }
  };

  const handleResetGame = () => {
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
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
            {row.map((col, colI) => {
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
