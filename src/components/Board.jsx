import { useState } from 'react';
import Tile from './Tile';
import { getAdjacentBombs } from '../utils/boardHelpers';

export default function Board({ gameState }) {
  const { width, height, numberOfBombs } = gameState;
  const numberOfTiles = width * height;
  const allBombs = generateBombLocations(numberOfTiles, numberOfBombs);

  const board = setUpBoard(numberOfTiles, allBombs);

  addAdjacentBombs(board, width, height);

  const allTiles = board.map((tile, index) => (
    <Tile state={tile} key={index}></Tile>
  ));

  return <div className="board">{allTiles}</div>;
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
    const tileObject = {
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
    board[i] = tileIsBomb ? bombObject : tileObject;
  }

  return board;
}

function addAdjacentBombs(board, width, height) {
  for (let i = 0; i < board.length; i++) {

    const tile = board[i];

    if (tile.contents !== 'bomb') {
      const adjacentBombCount = getAdjacentBombs(board, i, width, height);
      if (adjacentBombCount > 0) {
        tile.contents = adjacentBombCount;
      }
    }
  }
}
