"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { teams, missions, hintCard } from "@/lib/game-data"
import { cn } from "@/lib/utils"

export function MissionScreen() {
  const {
    currentMission,
    currentTeamIndex,
    currentQuestionIndex,
    scores,
    hintsUsed,
    showHint,
    eliminatedOption,
    answerQuestion,
    useHint,
    nextTeam,
    getCurrentQuestion,
  } = useGameStore()

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const mission = missions[currentMission]
  const team = teams[currentTeamIndex]
  const question = getCurrentQuestion()

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
  }, [currentMission, currentTeamIndex, currentQuestionIndex])

  if (!mission || !team || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-muted-foreground">Зареждане...</p>
      </div>
    )
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return

    setSelectedAnswer(answer)
    setShowResult(true)
    setIsCorrect(answer === question.correctAnswer)
    answerQuestion(team.id, question.id, answer, question.correctAnswer)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    nextTeam()
  }

  const handleUseHint = () => {
    if (hintsUsed[team.id] >= 3 || showResult) return
    useHint(
      team.id,
      question.options.map((o) => o.label),
      question.correctAnswer
    )
  }

  const canUseHint = hintsUsed[team.id] < 3 && !showResult

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Mission Header */}
        <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg border-2 border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Мисия {mission.id} от 3
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {mission.name}
              </h1>
              <p className="text-muted-foreground">{mission.description}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Въпрос {currentQuestionIndex + 1} от 2
              </p>
            </div>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {teams.map((t) => (
            <div
              key={t.id}
              className={cn(
                "rounded-xl p-3 text-white text-center transition-all",
                t.bgClass,
                t.id === team.id && "ring-4 ring-white scale-105 shadow-xl"
              )}
            >
              <p className="text-xs opacity-80 truncate">{t.name}</p>
              <p className="text-2xl font-bold">{scores[t.id]} т.</p>
            </div>
          ))}
        </div>

        {/* Current Team Banner */}
        <div
          className={cn(
            "rounded-2xl p-4 text-white text-center",
            team.bgClass
          )}
        >
          <p className="text-lg opacity-90">Сега играе:</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            {team.icon} {team.name}
          </h2>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border-4 border-primary/20">
          <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-8">
            {question.text}
          </h3>

          <div className="space-y-4">
            {question.options.map((option) => {
              const isEliminated = eliminatedOption === option.label
              const isSelected = selectedAnswer === option.label
              const isCorrectAnswer = option.label === question.correctAnswer

              let buttonClass =
                "w-full p-4 md:p-6 text-lg md:text-xl rounded-2xl border-4 transition-all text-left"

              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += " bg-primary text-primary-foreground border-primary"
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += " bg-destructive text-destructive-foreground border-destructive"
                } else {
                  buttonClass += " bg-muted text-muted-foreground border-border opacity-50"
                }
              } else if (isEliminated) {
                buttonClass +=
                  " bg-muted text-muted-foreground border-border opacity-30 cursor-not-allowed line-through"
              } else {
                buttonClass +=
                  " bg-card text-card-foreground border-border hover:border-primary hover:bg-primary/10"
              }

              return (
                <button
                  key={option.label}
                  onClick={() => !isEliminated && handleAnswer(option.label)}
                  disabled={showResult || isEliminated}
                  className={buttonClass}
                >
                  <span className="font-bold mr-3">{option.label}.</span>
                  {option.text}
                </button>
              )
            })}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div
              className={cn(
                "mt-6 p-4 rounded-2xl text-center text-xl font-bold",
                isCorrect
                  ? "bg-primary/20 text-primary"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {isCorrect ? (
                <span>🎉 Браво! +2 точки!</span>
              ) : (
                <span>
                  ❌ Грешен отговор! -1 точка. Верният отговор е:{" "}
                  {question.correctAnswer}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {!showResult && (
            <Button
              onClick={handleUseHint}
              disabled={!canUseHint}
              variant="secondary"
              size="lg"
              className="text-lg px-6 py-4 rounded-xl"
            >
              💡 {hintCard.name} ({3 - hintsUsed[team.id]} остават)
            </Button>
          )}

          {showResult && (
            <Button
              onClick={handleNext}
              size="lg"
              className="text-xl px-10 py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              Следващ въпрос →
            </Button>
          )}
        </div>

        {/* Hint Display */}
        {showHint && !showResult && (
          <div className="bg-secondary/50 rounded-2xl p-4 text-center border-2 border-secondary">
            <p className="text-secondary-foreground">
              💡 Подсказка: Един грешен отговор е премахнат!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
