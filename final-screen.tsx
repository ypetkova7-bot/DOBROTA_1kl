"use client"

import { useState } from "react"
import { useGameStore } from "@/lib/game-store"
import { finalQuestion } from "@/lib/game-data"
import { cn } from "@/lib/utils"

export function FinalScreen() {
  const { answerFinal, finalAnswered } = useGameStore()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleAnswer = (answer: string) => {
    if (finalAnswered) return
    setSelectedAnswer(answer)
    setIsCorrect(answer === finalQuestion.correctAnswer)
    answerFinal(answer)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary animate-pulse">
            💎 Сандъкът с Диаманта на Добротата 💎
          </h1>
          <p className="text-xl text-muted-foreground">
            Всички отбори отговарят заедно на финалния въпрос!
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/30 to-primary/30 rounded-3xl p-8 shadow-2xl border-4 border-secondary">
          <div className="text-6xl mb-6 animate-bounce">🗝️</div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            {finalQuestion.text}
          </h2>

          <div className="space-y-4">
            {finalQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.label
              const isCorrectAnswer = option.label === finalQuestion.correctAnswer

              let buttonClass =
                "w-full p-4 md:p-6 text-lg md:text-xl rounded-2xl border-4 transition-all text-left"

              if (finalAnswered) {
                if (isCorrectAnswer) {
                  buttonClass += " bg-primary text-primary-foreground border-primary"
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += " bg-destructive text-destructive-foreground border-destructive"
                } else {
                  buttonClass += " bg-muted text-muted-foreground border-border opacity-50"
                }
              } else {
                buttonClass +=
                  " bg-card text-card-foreground border-border hover:border-secondary hover:bg-secondary/20"
              }

              return (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(option.label)}
                  disabled={finalAnswered}
                  className={buttonClass}
                >
                  <span className="font-bold mr-3">{option.label}.</span>
                  {option.text}
                </button>
              )
            })}
          </div>

          {finalAnswered && (
            <div
              className={cn(
                "mt-8 p-6 rounded-2xl text-xl font-bold",
                isCorrect
                  ? "bg-primary/20 text-primary"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {isCorrect ? (
                <div className="space-y-2">
                  <p className="text-3xl">🎊 БРАВО! 🎊</p>
                  <p>Диамантът на Добротата е ваш!</p>
                  <p className="text-lg opacity-80">Всички отбори получават +3 бонус точки!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>Опитайте отново следващия път!</p>
                  <p className="text-lg opacity-80">
                    Верният отговор е: {finalQuestion.correctAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {finalAnswered && (
          <p className="text-lg text-muted-foreground animate-pulse">
            Зареждане на резултатите...
          </p>
        )}
      </div>
    </div>
  )
}
