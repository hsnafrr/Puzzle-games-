'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameGrid } from './game-grid';
import { BlockSelector } from './block-selector';
import {
  BLOCK_COLORS,
  initializeGrid,
  type Grid,
  getLinesToClear,
  clearLines,
  GRID_WIDTH,
  GRID_HEIGHT,
} from '@/lib/game-logic';

interface GameProps {
  onBack: () => void;
}

export function Game({ onBack }: GameProps) {
  const [grid, setGrid] = useState<Grid>(() => initializeGrid());
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [linesToClearAnimating, setLinesToClearAnimating] = useState<{
    rows: number[];
    cols: number[];
  } | null>(null);
  const [nextBlockColorId, setNextBlockColorId] = useState<number>(
    Math.floor(Math.random() * BLOCK_COLORS.length)
  );

  // Auto-clear lines
  useEffect(() => {
    const timer = setTimeout(() => {
      if (linesToClearAnimating) {
        const newGrid = clearLines(
          grid,
          linesToClearAnimating.rows,
          linesToClearAnimating.cols
        );
        setGrid(newGrid);
        setLinesToClearAnimating(null);
      }
    }, 600); // Match animation duration

    return () => clearTimeout(timer);
  }, [linesToClearAnimating, grid]);

  // Check for completed lines after grid changes
  useEffect(() => {
    if (!linesToClearAnimating) {
      const linesToClear = getLinesToClear(grid);
      if (linesToClear.rows.length > 0 || linesToClear.cols.length > 0) {
        setLinesToClearAnimating(linesToClear);
      }
    }
  }, [grid, linesToClearAnimating]);

  const handleCellClick = (x: number, y: number) => {
    if (selectedBlock !== null && grid[y][x].colorId === null) {
      const newGrid = grid.map(row => [...row]);
      newGrid[y][x].colorId = selectedBlock;
      setGrid(newGrid);
      setSelectedBlock(null);
      
      // Generate next block
      setNextBlockColorId(Math.floor(Math.random() * BLOCK_COLORS.length));
    }
  };

  const handleBlockSelect = (colorId: number) => {
    setSelectedBlock(selectedBlock === colorId ? null : colorId);
  };

  const handleReset = () => {
    setGrid(initializeGrid());
    setSelectedBlock(null);
    setLinesToClearAnimating(null);
    setNextBlockColorId(Math.floor(Math.random() * BLOCK_COLORS.length));
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-start min-h-screen py-4 sm:py-8 px-3 sm:px-4">
        <div className="space-y-6 sm:space-y-8 w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Block Blast</h1>
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-full text-sm sm:text-base bg-transparent"
            >
              Kembali
            </Button>
          </div>

          {/* Game Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-lg border border-white/60">
            <GameGrid
              grid={grid}
              selectedBlock={selectedBlock}
              linesToClear={linesToClearAnimating}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Next Block Preview and Controls */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-white/60">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <p className="text-xs sm:text-sm text-foreground/60 mb-2">Blok Berikutnya</p>
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl shadow-md"
                    style={{ backgroundColor: BLOCK_COLORS[nextBlockColorId] }}
                  />
                </div>
                <div className="flex-1">
                  <BlockSelector
                    selectedBlock={selectedBlock}
                    onSelect={handleBlockSelect}
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <Button
              onClick={handleReset}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-5 sm:py-6 text-base sm:text-lg rounded-full"
            >
              Main Ulang
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-center text-xs sm:text-sm text-foreground/60 space-y-1.5">
            <p>Pilih warna blok, lalu klik posisi untuk menempatkannya</p>
            <p>Isi baris atau kolom penuh untuk membersihkannya!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
