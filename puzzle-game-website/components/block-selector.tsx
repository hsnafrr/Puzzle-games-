'use client';

import { BLOCK_COLORS } from '@/lib/game-logic';

interface BlockSelectorProps {
  selectedBlock: number | null;
  onSelect: (colorId: number) => void;
}

export function BlockSelector({ selectedBlock, onSelect }: BlockSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs sm:text-sm text-foreground/60">Pilih Warna</p>
      <div className="grid grid-cols-3 gap-2">
        {BLOCK_COLORS.map((color, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all transform ${
              selectedBlock === index
                ? 'ring-4 ring-foreground scale-110 shadow-lg'
                : 'hover:scale-105 shadow-md hover:shadow-lg'
            }`}
            style={{ backgroundColor: color }}
            title={`Warna ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
