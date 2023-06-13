import { useState } from 'react';
import Tile from './Tile';

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
      const adjacentBombs = getAdjacentBombs(board, i, width, height);
      tile.contents = adjacentBombs;
    }
  }
}

function getAdjacentBombs(board, index, width, height) {
  const adjacentTiles = getAdjacentTiles(index, width, height);
  let adjacentBombs = 0;

  for (const tile of adjacentTiles) {
    const tileObject = board[tile];

    if (tileObject.contents === 'bomb') {
      adjacentBombs++;
    }
  }

  return adjacentBombs;
}

function getAdjacentTiles(index, width, height) {
  // Set up array of steps through board to get to adjacent tiles
  const allDirections = [
    -1,
    1,
    width,
    -width,
    width - 1,
    width + 1,
    -width - 1,
    -width + 1,
  ];

  // Set up array of adjacent tiles
  const adjacentTiles = [];
}
