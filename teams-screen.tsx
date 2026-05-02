"use client"

import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { teams, materials, hintCard } from "@/lib/game-data"

export function TeamsScreen() {
  const setPhase = useGameStore((state) => state.setPhase)
  const scores = useGameStore((state) => state.scores)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
          🛡️ Вашите отбори
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`${team.bgClass} rounded-3xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform`}
            >
              <div className="text-center space-y-4">
                <span className="text-5xl">{team.icon}</span>
                <h2 className="text-xl font-bold">{team.name}</h2>
                <div className="bg-white/20 rounded-2xl p-4">
                  <p className="text-sm opacity-90">Стартови точки</p>
                  <p className="text-4xl font-bold">{scores[team.id]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              📦 Материали за урока
            </h3>
            <ul className="space-y-2">
              {materials.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-6 shadow-lg border-2 border-secondary">
            <h3 className="text-xl font-bold text-secondary-foreground mb-4 flex items-center gap-2">
              💡 {hintCard.name}
            </h3>
            <p className="text-secondary-foreground/80 mb-4">{hintCard.description}</p>
            <ul className="space-y-1 text-sm text-secondary-foreground/70">
              {hintCard.rules.map((rule, i) => (
                <li key={i}>• {rule}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => setPhase("mission")}
            size="lg"
            className="text-xl px-10 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            🎯 Започни Мисия 1! →
          </Button>
        </div>
      </div>
    </div>
  )
}
