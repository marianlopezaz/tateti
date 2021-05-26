const GameResult = ({
  result,
  currentPlayer,
}: {
  result: 0 | 1 | 9 | null;
  currentPlayer: number | null;
}) => {
  const GAME_RESULT = {
    9: <h2>Juego terminado - EMPATE</h2>,
    0: <h2>El ganador es el jugador 1</h2>,
    1: <h2>El ganador es el jugador 2</h2>,
  };
  const DEFAULT = (
    <h2>Turno del jugador: {currentPlayer !== null && currentPlayer + 1}</h2>
  );

  return result !== null ? GAME_RESULT[result] : DEFAULT;
};

export default GameResult;