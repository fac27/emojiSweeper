import { useState } from 'react';
import BoardHeader from './BoardHeader';
import Board from './Board';
import styled from 'styled-components';

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
    <GameContainer>
      <BoardHeader gameState={gameState} setGameState={setGameState} />
      <Board gameState={gameState} setGameState={setGameState} />
    </GameContainer>
  );
}

const GameContainer = styled.div`
  width: 40%;

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
