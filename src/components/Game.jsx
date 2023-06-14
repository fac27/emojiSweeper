import { useState } from 'react';
import BoardHeader from './BoardHeader';
import Board from './Board';
import GameFooter from './GameFooter';

import styled from 'styled-components';

export default function Game() {
  const [gameState, setGameState] = useState({
    width: 16,
    height: 16,
    numberOfBombs: 18,
    isGameOver: false,
    isGameWon: false,
    isGameStarted: false,
    level: 'intermediate',
  });

  return (
    <GameContainer gameState={gameState}>
      <BoardHeader gameState={gameState} setGameState={setGameState} />
      <Board gameState={gameState} setGameState={setGameState} />
      <GameFooter gameState={gameState} setGameState={setGameState} />
    </GameContainer>
  );
}

const GameContainer = styled.div`
  width: ${({ gameState }) =>
    `${
      gameState.level === 'intermediate'
        ? '40%'
        : gameState.level === 'expert'
        ? '60%'
        : '20%'
    }`};

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
