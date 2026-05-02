"use client"

import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { story } from "@/lib/game-data"

export function StoryScreen() {
  const setPhase = useGameStore((state) => state.setPhase)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
          📖 Историята започва...
        </h1>

        <div className="bg-card rounded-3xl p-8 shadow-xl border-4 border-secondary/30">
          <div className="text-xl md:text-2xl leading-relaxed text-card-foreground space-y-6">
            {story.split("\n\n").map((paragraph, i) => (
              <p key={i} className="first-letter:text-4xl first-letter:font-bold first-letter:text-primary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setPhase("teams")}
            size="lg"
            className="text-xl px-10 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Запознай се с отборите! →
          </Button>
        </div>
      </div>
    </div>
  )
}
