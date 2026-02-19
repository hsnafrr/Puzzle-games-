'use client';

import { Button } from '@/components/ui/button';

interface LandingProps {
  onStartGame: () => void;
}

export function Landing({ onStartGame }: LandingProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-56 h-56 sm:w-96 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-0">
        <div className="text-center space-y-6 sm:space-y-8 max-w-2xl">
          {/* Title with animated gradient */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight">
              Block <span className="text-primary">Blast</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 font-light">
              Teka-teki blok yang mengasyikkan dan santai
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-base sm:text-lg text-foreground/60 leading-relaxed">
              Mainkan game puzzle sederhana yang menggabungkan strategi dan kesenangan. 
              Tempatkan blok-blok berwarna di grid dan tonton baris penuh menghilang!
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Button
              onClick={onStartGame}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
            >
              Mulai Main
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 sm:pt-12">
            <div className="p-4 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60">
              <p className="text-sm font-semibold text-primary mb-2">🎮</p>
              <p className="text-sm text-foreground/70">Gameplay Inti</p>
            </div>
            <div className="p-4 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60">
              <p className="text-sm font-semibold text-primary mb-2">✨</p>
              <p className="text-sm text-foreground/70">Animasi Halus</p>
            </div>
            <div className="p-4 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60">
              <p className="text-sm font-semibold text-primary mb-2">♾️</p>
              <p className="text-sm text-foreground/70">Tanpa Batas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
