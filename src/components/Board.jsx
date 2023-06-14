import Tile from './Tile';
import {
  addAdjacentBombs,
  getAdjacentTileIndexes,
} from '../utils/boardHelpers';
import styled from 'styled-components';

export default function Board({ gameState, setGameState }) {
  const { width, height, numberOfBombs } = gameState;
  const numberOfTiles = width * height;
  const allBombs = generateBombLocations(numberOfTiles, numberOfBombs);

  const board = setUpBoard(numberOfTiles, allBombs);

  addAdjacentBombs(board, width, height);

  const allTiles = board.map((tile, index) => (
    <Tile
      state={tile}
      gameState={gameState}
      setGameState={setGameState}
      board={board}
      index={index}
      key={index}></Tile>
  ));

  return <BoardDiv gameState={gameState}>{allTiles}</BoardDiv>;
}

function generateBombLocations(numberOfTiles, numberOfBombs) {
  const allBombs = [];

  for (let i = 0; i < numberOfBombs; i++) {
    let randomTile = Math.floor(Math.random() * numberOfTiles);

    while (allBombs.includes(randomTile)) {
      randomTile = Math.floor(Math.random() * numberOfTiles);
    }

    allBombs.push(randomTile);
  }
  return allBombs;
}

function setUpBoard(numberOfTiles, bombArray) {
  const board = new Array(numberOfTiles);

  for (let i = 0; i < board.length; i++) {
    const blankTileObject = {
      contents: 'blank',
      isFlagged: false,
      isQuestionMark: false,
      isRevealed: false,
    };
    const bombObject = {
      contents: 'bomb',
      isFlagged: false,
      isQuestionMark: false,
      isRevealed: false,
    };
    const tileIsBomb = bombArray.includes(i);

    // If there should be a bomb at this index, place it, otherwise place a tile
    board[i] = tileIsBomb ? bombObject : blankTileObject;
  }

  return board;
}

const BoardDiv = styled.div`
  display: grid;
  grid-template-columns: ${({ gameState }) =>
    `repeat(${gameState.width}, 1fr)`};
  grid-template-rows: ${({ gameState }) => `repeat(${gameState.height}, 1fr)`};
  border: 1px solid black;
`;
