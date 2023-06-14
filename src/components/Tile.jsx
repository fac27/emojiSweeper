import { useState } from 'react';
import styled from 'styled-components';
import { revealBlankTiles } from '../utils/boardHelpers';

export default function Tile({ state, board, index, gameState }) {
  const [tileState, setTileState] = useState(state);

  const handleClick = (event) => {
    if (board[index].contents === 'blank') {
      revealBlankTiles(
        board,
        index,
        gameState.width,
        gameState.height,
        tileState,
        setTileState
      );
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const { contents } = tileState;
  let display = '';
  if (contents === 'bomb') display = '💣';
  if (contents.toString().match(/^[1-8]$/)) display = contents;

  return (
    <TileDiv onClick={handleClick} onContextMenu={handleRightClick}>
      {display}
    </TileDiv>
  );
}

const TileDiv = styled.div`
  font-size: 20px;
  width: var(--tile-width);
  height: var(--tile-width);
  border: 1px solid black;
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

/*
<p>Bomb &#x1F4a3;</p>
<p>Smiley &#128512;</p>
<p>Flag &#x1F6a9;</p>
<p>Skull &#x1F480;</p>
<p>Dead smiley &#x1f635</p>
<p>Explosion &#x1F4a5;</p>
*/
// flag-question-nothing
