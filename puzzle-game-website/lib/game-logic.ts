// Game grid constants
export const GRID_WIDTH = 6;
export const GRID_HEIGHT = 8;

// Block colors palette
export const BLOCK_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Coral
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
];

export interface GridCell {
  colorId: number | null;
  x: number;
  y: number;
}

export interface Block {
  x: number;
  y: number;
  colorId: number;
}

export type Grid = GridCell[][];

// Initialize empty grid
export function initializeGrid(): Grid {
  const grid: Grid = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row: GridCell[] = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      row.push({ colorId: null, x, y });
    }
    grid.push(row);
  }
  return grid;
}

// Check if a block can be placed at position
export function canPlaceBlock(grid: Grid, x: number, y: number): boolean {
  if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) {
    return false;
  }
  return grid[y][x].colorId === null;
}

// Place a block on the grid
export function placeBlock(grid: Grid, block: Block): Grid {
  const newGrid = grid.map(row => [...row]);
  newGrid[block.y][block.x].colorId = block.colorId;
  return newGrid;
}

// Check for completed rows and columns
export function getLinesToClear(grid: Grid): { rows: number[]; cols: number[] } {
  const rows: number[] = [];
  const cols: number[] = [];

  // Check rows
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let isFull = true;
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (grid[y][x].colorId === null) {
        isFull = false;
        break;
      }
    }
    if (isFull) rows.push(y);
  }

  // Check columns
  for (let x = 0; x < GRID_WIDTH; x++) {
    let isFull = true;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (grid[y][x].colorId === null) {
        isFull = false;
        break;
      }
    }
    if (isFull) cols.push(x);
  }

  return { rows, cols };
}

// Clear lines from grid
export function clearLines(grid: Grid, rows: number[], cols: number[]): Grid {
  let newGrid = grid.map(row => [...row]);

  // Clear specified rows
  for (const y of rows) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      newGrid[y][x].colorId = null;
    }
  }

  // Clear specified columns
  for (const x of cols) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      newGrid[y][x].colorId = null;
    }
  }

  return newGrid;
}

// Get valid placement positions for next block
export function getValidPositions(grid: Grid): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (grid[y][x].colorId === null) {
        positions.push({ x, y });
      }
    }
  }
  return positions;
}

// Check if grid is full (game over condition - optional)
export function isGridFull(grid: Grid): boolean {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (grid[y][x].colorId === null) {
        return false;
      }
    }
  }
  return true;
}
