import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function BoardHeader({ gameState, setGameState }) {
  const [onesPlace, setOnesPlace] = useState(0);
  const [tensPlace, setTensPlace] = useState(0);
  const [hundredsPlace, setHundredsPlace] = useState(0);

  useEffect(() => {
    let timer = null;

    const startTimer = () => {
      timer = setInterval(() => {
        setOnesPlace((prevOne) => (prevOne + 1) % 10);

        if (onesPlace === 9) {
          setTensPlace((prevTen) => (prevTen + 1) % 10);

          if (tensPlace === 9) {
            setHundredsPlace((prevHundred) => (prevHundred + 1) % 10);
          }
        }
      }, 1000);
    };

    if (gameState.isGameStarted) {
      startTimer();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onesPlace, tensPlace]);

  const handleIsGameOver = () => {
    setGameState((prevValues) => {
      return { ...prevValues, isGameOver: !prevValues.isGameOver };
    });
  };

  return (
    <Header>
      <BombNumber>0{gameState.numberOfBombs}</BombNumber>
      <EmojiButton onClick={handleIsGameOver}>
        {gameState.isGameOver ? '😵' : '🙂'}
      </EmojiButton>
      <Timer>
        <span>{hundredsPlace}</span>
        <span>{tensPlace}</span>
        <span>{onesPlace}</span>
      </Timer>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 4px;
  padding: 1rem;
`;

const BombNumber = styled.div`
  font-size: 2rem;
  color: #b21f12;
`;

const EmojiButton = styled.button`
  font-size: 2rem;
  border: none;
  background: transparent;
`;

const Timer = styled(BombNumber)``;
