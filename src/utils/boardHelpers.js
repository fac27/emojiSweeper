/**
 * Check each tile in the supplied Board array and
 * add number of adjacent bombs to its tile state object
 * @param {Array} board - Board array of tile state objects
 * @param {int} width - Width of board
 * @param {int} height - Height of board
 */
export function addAdjacentBombs(board, width, height) {
  for (let i = 0; i < board.length; i++) {
    const tile = board[i];

    if (tile.contents !== 'bomb') {
      const adjacentBombCount = getAdjacentBombs(board, i, width, height);
      if (adjacentBombCount > 0) {
        tile.contents = adjacentBombCount.toString();
      }
    }
  }
}

/**
 * Get the number of bombs in tiles adjacent to the supplied tile index
 * @param {Array} board - Board array of tile state objects
 * @param {int} index - Index of tile on the board to check from
 * @param {int} width - Width of board
 * @param {int} height - Height of board
 * @returns {int} - Int representing how many bombs are adjacent
 */
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

/**
 * Get the board array indexes of all tiles adjacent to the supplied tile index
 * @param {int} index - Index of tile on the board to check from
 * @param {int} width - Width of board
 * @param {int} height - Height of board
 * @returns {Array} - Array of adjacent tile indexes
 */
export function getAdjacentTileIndexes(index, width, height) {
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
  const totalTiles = width * height;

  // Check each direction to see if it is in the array index range. If so add to adjacent tiles array.
  for (const step of allDirections) {
    const tileIndexToCheck = index + step;

    if (index % width === 0 && tileIndexToCheck % width === width - 1) continue;
    if (index % width === width - 1 && tileIndexToCheck % width === 0) continue;
    if (tileIndexToCheck < 0 || tileIndexToCheck >= totalTiles) continue;

    adjacentTiles.push(tileIndexToCheck);
  }
  return adjacentTiles;
}

/**
 * Set the isRevealed property of all blank tiles surrounding supplied blankTileIndex
 * @param {Array} board - Board array of tile state objects
 * @param {int} blankTileIndex - Index of tile on the board to check from
 * @param {int} width - Width of board
 * @param {int} height - Height of board
 */
export function revealBlankTiles(board, blankTileIndex, width, height) {
  // Check that supplied tile is actually blank
  if (board[blankTileIndex].contents === 'blank') {
    throw new Error('Tile is not blank');
  }
  const visitedTiles = [];

  // Inner function to recursively iterate through tiles
  const iterateThroughTiles = function (index) {
    // Do nothing if we checked this tile already
    if (visitedTiles.includes(index)) {
      return;
    }
    visitedTiles.push(index);

    const currentTile = board[index];

    // Do nothing if the tile is a bomb
    if (currentTile.contents === 'bomb') {
      return;
    }

    currentTile.isRevealed = true;

    // If the tile is blank check all of its neighbours
    if (currentTile.contents === 'blank') {
      getAdjacentTileIndexes(index, width, height).forEach((index) =>
        iterateThroughTiles(index)
      );
    }
  };

  iterateThroughTiles(blankTileIndex);
}
