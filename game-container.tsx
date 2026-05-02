"use client"

import { useGameStore } from "@/lib/game-store"
import { IntroScreen } from "./intro-screen"
import { StoryScreen } from "./story-screen"
import { TeamsScreen } from "./teams-screen"
import { MissionScreen } from "./mission-screen"
import { FinalScreen } from "./final-screen"
import { ResultsScreen } from "./results-screen"

export function GameContainer() {
  const phase = useGameStore((state) => state.phase)

  return (
    <div className="min-h-screen bg-background">
      {phase === "intro" && <IntroScreen />}
      {phase === "story" && <StoryScreen />}
      {phase === "teams" && <TeamsScreen />}
      {phase === "mission" && <MissionScreen />}
      {phase === "final" && <FinalScreen />}
      {phase === "results" && <ResultsScreen />}
    </div>
  )
}
