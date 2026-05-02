"use client"

import { create } from "zustand"
import { teams, missions, finalQuestion, type Question } from "./game-data"

export type GamePhase = "intro" | "story" | "teams" | "mission" | "final" | "results"

interface AnswerResult {
  teamId: string
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
  pointsAwarded: number
}

interface GameState {
  phase: GamePhase
  currentMission: number
  currentTeamIndex: number
  currentQuestionIndex: number
  scores: Record<string, number>
  answeredQuestions: Set<string>
  answerResults: Record<string, AnswerResult>
  hintsUsed: Record<string, number>
  showHint: boolean
  eliminatedOption: string | null
  finalAnswered: boolean
  
  // Actions
  setPhase: (phase: GamePhase) => void
  startGame: () => void
  nextTeam: () => void
  answerQuestion: (teamId: string, questionId: string, answer: string, correctAnswer: string) => void
  useHint: (teamId: string, options: string[], correctAnswer: string) => void
  hideHint: () => void
  nextMission: () => void
  answerFinal: (answer: string) => void
  resetGame: () => void
  getCurrentQuestion: () => Question | null
  getTeamScore: (teamId: string) => number
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: "intro",
  currentMission: 0,
  currentTeamIndex: 0,
  currentQuestionIndex: 0,
  scores: Object.fromEntries(teams.map((t) => [t.id, 0])),
  answeredQuestions: new Set(),
  answerResults: {},
  hintsUsed: Object.fromEntries(teams.map((t) => [t.id, 0])),
  showHint: false,
  eliminatedOption: null,
  finalAnswered: false,

  setPhase: (phase) => set({ phase }),

  startGame: () =>
    set({
      phase: "story",
      currentMission: 0,
      currentTeamIndex: 0,
      currentQuestionIndex: 0,
      scores: Object.fromEntries(teams.map((t) => [t.id, 0])),
      answeredQuestions: new Set(),
      answerResults: {},
      hintsUsed: Object.fromEntries(teams.map((t) => [t.id, 0])),
      finalAnswered: false,
    }),

  nextTeam: () => {
    const state = get()
    const nextIndex = state.currentTeamIndex + 1
    
    if (nextIndex >= teams.length) {
      // Move to next question or next mission
      const nextQuestionIndex = state.currentQuestionIndex + 1
      if (nextQuestionIndex >= 2) {
        // All questions done for this mission
        if (state.currentMission >= missions.length - 1) {
          set({ phase: "final" })
        } else {
          set({
            currentMission: state.currentMission + 1,
            currentTeamIndex: 0,
            currentQuestionIndex: 0,
            showHint: false,
            eliminatedOption: null,
          })
        }
      } else {
        set({
          currentTeamIndex: 0,
          currentQuestionIndex: nextQuestionIndex,
          showHint: false,
          eliminatedOption: null,
        })
      }
    } else {
      set({
        currentTeamIndex: nextIndex,
        showHint: false,
        eliminatedOption: null,
      })
    }
  },

  answerQuestion: (teamId, questionId, answer, correctAnswer) => {
    const state = get()
    const isCorrect = answer === correctAnswer
    const points = isCorrect ? 2 : -1

    const newScores = {
      ...state.scores,
      [teamId]: Math.max(0, state.scores[teamId] + points),
    }

    const newAnswered = new Set(state.answeredQuestions)
    newAnswered.add(questionId)

    const newResults = {
      ...state.answerResults,
      [questionId]: {
        teamId,
        questionId,
        selectedAnswer: answer,
        isCorrect,
        pointsAwarded: points,
      },
    }

    set({
      scores: newScores,
      answeredQuestions: newAnswered,
      answerResults: newResults,
    })
  },

  useHint: (teamId, options, correctAnswer) => {
    const state = get()
    if (state.hintsUsed[teamId] >= 3) return // Max 1 hint per mission

    // Find a wrong option to eliminate
    const wrongOptions = options.filter((opt) => opt !== correctAnswer)
    const eliminated = wrongOptions[Math.floor(Math.random() * wrongOptions.length)]

    set({
      hintsUsed: {
        ...state.hintsUsed,
        [teamId]: state.hintsUsed[teamId] + 1,
      },
      showHint: true,
      eliminatedOption: eliminated,
    })
  },

  hideHint: () => set({ showHint: false }),

  nextMission: () => {
    const state = get()
    if (state.currentMission >= missions.length - 1) {
      set({ phase: "final" })
    } else {
      set({
        currentMission: state.currentMission + 1,
        currentTeamIndex: 0,
        currentQuestionIndex: 0,
        showHint: false,
        eliminatedOption: null,
      })
    }
  },

  answerFinal: (answer) => {
    const state = get()
    const isCorrect = answer === finalQuestion.correctAnswer
    
    if (isCorrect) {
      // All teams get bonus points
      const newScores = { ...state.scores }
      teams.forEach((t) => {
        newScores[t.id] += 3
      })
      set({ scores: newScores, finalAnswered: true })
    } else {
      set({ finalAnswered: true })
    }

    setTimeout(() => set({ phase: "results" }), 2000)
  },

  resetGame: () =>
    set({
      phase: "intro",
      currentMission: 0,
      currentTeamIndex: 0,
      currentQuestionIndex: 0,
      scores: Object.fromEntries(teams.map((t) => [t.id, 0])),
      answeredQuestions: new Set(),
      answerResults: {},
      hintsUsed: Object.fromEntries(teams.map((t) => [t.id, 0])),
      showHint: false,
      eliminatedOption: null,
      finalAnswered: false,
    }),

  getCurrentQuestion: () => {
    const state = get()
    if (state.phase !== "mission") return null
    
    const mission = missions[state.currentMission]
    if (!mission) return null
    
    const team = teams[state.currentTeamIndex]
    if (!team) return null
    
    const questions = mission.questions[team.id]
    if (!questions) return null
    
    return questions[state.currentQuestionIndex] || null
  },

  getTeamScore: (teamId) => get().scores[teamId] || 0,
}))
