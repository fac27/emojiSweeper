import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function BoardHeader() {
  const [isGameLost, setIsGameLost] = useState(false);
  const [onesPlace, setOnesPlace] = useState(0);
  const [tensPlace, setTensPlace] = useState(0);
  const [hundredsPlace, setHundredsPlace] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

    if (isTimerRunning) {
      startTimer();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, onesPlace, tensPlace]);

  const handleGameRestart = () => {
    setIsGameLost((prevValue) => !prevValue);
  };

  const handleTimerToggle = () => {
    setIsTimerRunning((prevValue) => !prevValue);
  };

  return (
    <Header>
      <BombNumber>010</BombNumber>
      <EmojiButton onClick={handleGameRestart}>
        {isGameLost ? '😵' : '🙂'}
      </EmojiButton>
      <Timer>
        <span>{hundredsPlace}</span>
        <span>{tensPlace}</span>
        <span>{onesPlace}</span>
      </Timer>
      <TimerButton onClick={handleTimerToggle}>
        {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
      </TimerButton>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const TimerButton = styled.button``;
