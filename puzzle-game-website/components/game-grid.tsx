'use client';

import { BLOCK_COLORS, type Grid, GRID_WIDTH, GRID_HEIGHT } from '@/lib/game-logic';

interface GameGridProps {
  grid: Grid;
  selectedBlock: number | null;
  linesToClear: { rows: number[]; cols: number[] } | null;
  onCellClick: (x: number, y: number) => void;
}

export function GameGrid({
  grid,
  selectedBlock,
  linesToClear,
  onCellClick,
}: GameGridProps) {
  return (
    <div className="flex justify-center overflow-auto">
      <div
        className="gap-1.5 sm:gap-2 bg-gradient-to-b from-blue-100 to-blue-50 p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_WIDTH}, minmax(0, 1fr))`,
          minWidth: 'fit-content',
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const isRowMarked = linesToClear?.rows.includes(y);
            const isColMarked = linesToClear?.cols.includes(x);
            const isMarked = isRowMarked || isColMarked;

            return (
              <button
                key={`${x}-${y}`}
                onClick={() => onCellClick(x, y)}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl transition-all duration-300 transform ${
                  isMarked
                    ? 'scale-95 opacity-0'
                    : 'scale-100 opacity-100 hover:scale-105 active:scale-95'
                } ${
                  cell.colorId !== null
                    ? 'shadow-md hover:shadow-lg cursor-default'
                    : 'bg-white/70 hover:bg-white border-2 border-dashed border-blue-300 cursor-pointer'
                } ${
                  selectedBlock !== null && cell.colorId === null
                    ? 'hover:border-primary hover:border-solid border-primary/50'
                    : ''
                }`}
                style={{
                  backgroundColor:
                    cell.colorId !== null
                      ? BLOCK_COLORS[cell.colorId]
                      : undefined,
                }}
              >
                {/* Explosion effect for clearing lines */}
                {isMarked && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-tr from-yellow-300 to-orange-200 animate-ping" />
                )}

                {/* Highlight when selected */}
                {selectedBlock === cell.colorId && cell.colorId !== null && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-4 ring-primary/50 animate-pulse" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
