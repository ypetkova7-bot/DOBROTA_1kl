"use client"

import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { teams, timingScript } from "@/lib/game-data"
import { cn } from "@/lib/utils"

export function ResultsScreen() {
  const { scores, resetGame } = useGameStore()

  // Sort teams by score
  const sortedTeams = [...teams].sort((a, b) => scores[b.id] - scores[a.id])
  const winner = sortedTeams[0]
  const maxScore = scores[winner.id]

  // Check for ties
  const winners = sortedTeams.filter((t) => scores[t.id] === maxScore)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Winner Announcement */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            🏆 Играта приключи! 🏆
          </h1>
          
          {winners.length > 1 ? (
            <div className="space-y-2">
              <p className="text-2xl text-foreground">Имаме равенство!</p>
              <div className="flex flex-wrap justify-center gap-2">
                {winners.map((t) => (
                  <span key={t.id} className={cn("px-4 py-2 rounded-full text-white font-bold", t.bgClass)}>
                    {t.icon} {t.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-2xl text-foreground">Победител:</p>
              <div
                className={cn(
                  "inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-3xl font-bold animate-pulse",
                  winner.bgClass
                )}
              >
                {winner.icon} {winner.name}
              </div>
            </div>
          )}
        </div>

        {/* Final Scores */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border-4 border-primary/20">
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            📊 Крайни резултати
          </h2>

          <div className="space-y-4">
            {sortedTeams.map((team, index) => (
              <div
                key={team.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl",
                  index === 0 && "bg-secondary/30 border-2 border-secondary"
                )}
              >
                <span className="text-3xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}
                </span>
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white text-xl",
                    team.bgClass
                  )}
                >
                  {team.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{team.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{scores[team.id]}</p>
                  <p className="text-sm text-muted-foreground">точки</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timing Script Summary */}
        <div className="bg-muted rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            📋 Скрипт за водене (30 минути)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timingScript.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-card rounded-xl p-3"
              >
                <span className="bg-primary/20 text-primary font-mono text-sm px-2 py-1 rounded">
                  {item.time}
                </span>
                <span className="text-card-foreground">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            🌟 Поздравления на всички Пазители на Добротата! 🌟
          </h3>
          <p className="text-muted-foreground">
            Днес научихте колко важни са честността, справедливостта, 
            приятелството и учтивостта. Продължавайте да бъдете добри!
          </p>
        </div>

        {/* Play Again */}
        <div className="flex justify-center">
          <Button
            onClick={resetGame}
            size="lg"
            className="text-xl px-10 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            🔄 Играй отново
          </Button>
        </div>
      </div>
    </div>
  )
}
