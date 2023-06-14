import styled from 'styled-components';
import { revealBlankTiles } from '../utils/boardHelpers';

export default function Tile({ state, board, setBoard, index, gameState }) {
  const handleClick = (event) => {
    if (state.isFlagged) {
      setBoard((prevBoard) => {
        return [
          ...prevBoard.slice(0, index),
          { ...prevBoard[index], isFlagged: false, isQuestionMark: true },
          ...prevBoard.slice(index + 1),
        ];
      });
      console.log('Flag --> question mark');
      return;
    }

    if (state.isQuestionMark) {
      setBoard((prevBoard) => {
        return [
          ...prevBoard.slice(0, index),
          { ...prevBoard[index], isFlagged: false, isQuestionMark: false },
          ...prevBoard.slice(index + 1),
        ];
      });
      console.log('Question mark --> nothing');
      return;
    }

    setBoard((prevBoard) => {
      return [
        ...prevBoard.slice(0, index),
        { ...prevBoard[index], isRevealed: true },
        ...prevBoard.slice(index + 1),
      ];
    });

    if (state.contents === 'blank') {
      const revealedTiles = revealBlankTiles(
        board,
        index,
        gameState.width,
        gameState.height
      );
      
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        revealedTiles.forEach((tileIndex) => {
          newBoard[tileIndex] = { ...newBoard[tileIndex], isRevealed: true };
        });
        return newBoard;
      });
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    if (state.isFlagged) {
      setBoard((prevBoard) => {
        return [
          ...prevBoard.slice(0, index),
          { ...prevBoard[index], isFlagged: false, isQuestionMark: true },
          ...prevBoard.slice(index + 1),
        ];
      });
      return;
    }

    if (state.isQuestionMark) {
      setBoard((prevBoard) => {
        return [
          ...prevBoard.slice(0, index),
          { ...prevBoard[index], isFlagged: false, isQuestionMark: false },
          ...prevBoard.slice(index + 1),
        ];
      });
      return;
    }

    setBoard((prevBoard) => {
      return [
        ...prevBoard.slice(0, index),
        { ...prevBoard[index], isFlagged: true },
        ...prevBoard.slice(index + 1),
      ];
    });
  };

  const { contents, isFlagged, isQuestionMark, isRevealed } = state;
  let display = '';
  if (contents === 'bomb' && isRevealed) display = '💣';
  if (contents.toString().match(/^[1-8]$/) && isRevealed) display = contents;
  if (isFlagged) display = '🚩';
  if (isQuestionMark) display = '?';

  return (
    <>
      {isRevealed && (
        <TileDiv onClick={handleClick} onContextMenu={handleRightClick}>
          {display}
        </TileDiv>
      )}
      {!isRevealed && (
        <TileDivCover onClick={handleClick} onContextMenu={handleRightClick}>
          {display}
        </TileDivCover>
      )}
    </>
  );
}

const TileDiv = styled.div`
  font-size: 20px;
  width: var(--tile-width);
  height: var(--tile-width);
  border: 1px solid #aaa;
  border-radius: 4px;
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: rgb(234, 234, 234);
  text-align: center;
  line-height: var(--tile-width);

  :hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

const TileDivCover = styled.div`
  font-size: 20px;
  width: var(--tile-width);
  height: var(--tile-width);
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: rgb(234, 234, 234);
  text-align: center;
  line-height: var(--tile-width);
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.5);
  :hover {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

/*
<p>Bomb &#x1F4a3;</p>
<p>Smiley &#128512;</p>
<p>Flag &#x1F6a9;</p>
<p>Skull &#x1F480;</p>
<p>Dead smiley &#x1f635</p>
<p>Explosion &#x1F4a5;</p>
*/
// flag-question-nothing
