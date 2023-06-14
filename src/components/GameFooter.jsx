import { useRef } from 'react';
import styled from 'styled-components';

const levels = {
  beginner: {
    width: 8,
    height: 8,
    numberOfBombs: 10,
  },

  intermediate: {
    width: 16,
    height: 16,
    numberOfBombs: 18,
  },
  expert: {
    width: 20,
    height: 20,
    numberOfBombs: 10,
  },
};

export default function GameFooter({ gameState, setGameState }) {
  const footerRef = useRef(null);

  const handleLevelChange = (event) => {
    const buttonClassName = event.target.className.split(' ')[0];

    for (let button of footerRef.current.children) {
      const currentButton = button.className.split(' ')[0];

      if (currentButton === buttonClassName) {
        button.classList.add('active');

        setGameState((prevValues) => {
          return {
            ...prevValues,
            level: currentButton,
            width: levels[currentButton].width,
            height: levels[currentButton].height,
            numberOfBombs: levels[currentButton].numberOfBombs,
          };
        });
      } else {
        button.classList.remove('active');
      }
    }
  };

  return (
    <Footer gameState={gameState} ref={footerRef}>
      <button className="beginner" onClick={handleLevelChange}>
        Beginner
      </button>
      <button className="intermediate active" onClick={handleLevelChange}>
        Intermediate
      </button>
      <button className="expert" onClick={handleLevelChange}>
        Expert
      </button>
    </Footer>
  );
}

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 0.5rem;

  button {
    font-size: ${({ gameState }) =>
      `${gameState.level === 'intermediate' ? '1.1rem' : '0.9rem'}`};
    padding: 0.5rem;
    cursor: pointer;
  }

  button.active {
    background: #8ecae6;
  }
`;
