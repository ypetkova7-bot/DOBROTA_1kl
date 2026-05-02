"use client"

import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"

export function IntroScreen() {
  const startGame = useGameStore((state) => state.startGame)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary animate-bounce">
            ✨ Мисия ДОБРОТА ✨
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Интерактивна RPG игра за 1 клас
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-xl border-4 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Социално-емоционални умения
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Учтивост", "Приятелство", "Честност", "Справедливост", "Доброта"].map(
              (word) => (
                <span
                  key={word}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-lg font-medium"
                >
                  {word}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">📋 Правила за точки:</h3>
          <div className="flex justify-center gap-8 text-lg">
            <span className="text-primary font-bold">✓ Верен: +2 т.</span>
            <span className="text-destructive font-bold">✗ Грешен: -1 т.</span>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">⏱️ Време: 30 минути</h3>
        </div>

        <Button
          onClick={startGame}
          size="lg"
          className="text-2xl px-12 py-8 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          🚀 Започни играта!
        </Button>
      </div>
    </div>
  )
}
