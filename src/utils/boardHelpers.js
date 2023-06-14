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
  const allDirections = [-1, 1, width, -width, width - 1, width + 1, -width - 1, -width + 1];

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

