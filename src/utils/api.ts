import axios from "axios";
import { API_URL } from "./config";

export const startNewGame = async () => {
  return (await axios.post(API_URL)).data;
};

export const resetGame = async (gameId: number | null) => {
  return await axios.delete(`${API_URL}/${gameId}`);
};

export const newMovement = async ({
  gameId,
  playerId,
  movement,
}: {
  gameId: number | null;
  playerId: number | null;
  movement: number[];
}) => {
  return (
    await axios.post(`${API_URL}/newmovement`, {
      gameId,
      playerId,
      movement,
    })
  ).data;
};

export const getGameState = async (gameId: number | null) => {
  return (
    await axios.post(`${API_URL}/getGameState`, {
      gameId,
    })
  ).data;
};
