export function getAdjacentBombs(board, index, width, height) {
  const adjacentTileIndexes = getAdjacentTileIndexes(index, width, height);
  let adjacentBombs = 0;

  adjacentTileIndexes.forEach((tileIndex) => {
    const tileObject = board[tileIndex];

    if (tileObject.contents === 'bomb') {
      adjacentBombs++;
    }
  });

  return adjacentBombs;
}

function getAdjacentTileIndexes(index, width, height) {
  // Set up array of steps through board to get to adjacent tiles
  const allDirections = getAllDirections(width);

  // Set up array of adjacent tiles
  const adjacentTiles = [];
  const totalTiles = width * height;

  // Check each direction to see if it is in the array index range. If so add to directions.
  for (const step of allDirections) {

    const tileIndexToCheck = index + step;

    if (index % width === 0 && tileIndexToCheck % width === width -1) continue;
    if (index % width === width - 1 && tileIndexToCheck % width === 0) continue;
    if (tileIndexToCheck < 0 || tileIndexToCheck >= totalTiles) continue;

    adjacentTiles.push(tileIndexToCheck);
  }
  return adjacentTiles;
}

function getAllDirections(width) {
  return [-1, 1, width, -width, width - 1, width + 1, -width - 1, -width + 1];

  // return {
  //   W: -1,
  //   E: 1,
  //   S: width,
  //   N: -width,
  //   SW: width - 1,
  //   SE: width + 1,
  //   NW: -width - 1,
  //   NE: -width + 1,
  // };
}
