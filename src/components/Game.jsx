import { useState } from 'react';
import BoardHeader from './BoardHeader';
import Board from './Board';

export default function Game() {
  const [gameState, setGameState] = useState({
    width: 8,
    height: 8,
    numberOfBombs: 10,
    isGameOver: false,
    isGameWon: false,
    isGameStarted: false,
  });

  return (
    <>
      <BoardHeader gameState={gameState} setGameState={setGameState} />
      <Board gameState={gameState} setGameState={setGameState} />
    </>
  );
}
