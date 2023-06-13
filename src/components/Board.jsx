import Tile from './Tile';
import styled from 'styled-components';

export default function Board() {
  const allBombs = generateBombLocations(8, 8, 10);
  const board = setUpBoard(64, allBombs);
  const allTiles = board.map((tile, index) => (
    <Tile state={tile} key={index}></Tile>
  ));

  return <BoardDiv className="board">{allTiles}</BoardDiv>;
}

function generateBombLocations(width, height, numberOfBombs) {
  const numberOfTiles = width * height;
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
    if (bombArray.includes(i)) {
      board[i] = { contents: 'bomb' };
    } else {
      board[i] = { contents: 'blank' };
    }
  }

  return board;
}

const BoardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(8, var(--tile-width));
  grid-template-rows: repeat(8, var(--tile-width));
  grid-gap: 0;
  margin: 0 auto;
  padding: 0;
  width: calc(var(--tile-width) * 8);
  height: calc(var(--tile-width) * 8);
`;
