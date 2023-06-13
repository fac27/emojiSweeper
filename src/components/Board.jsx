import { useState } from 'react';

const boardArray = [];

export default function Board() {
  const allBombs = generateBombLocations(8, 8, 10);
  console.log(allBombs);
  return <>Done</>;
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
