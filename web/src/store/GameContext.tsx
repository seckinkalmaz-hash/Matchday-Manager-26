import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { makeGameState } from '../data/seed'
import { applyFormationToSquad } from '../lib/formations'
import { simulateMatch } from '../lib/matchSim'
import type {
  FormationId,
  GameState,
  MatchResult,
  Player,
  TabId,
} from '../types'

interface GameContextValue {
  state: GameState
  tab: TabId
  setTab: (tab: TabId) => void
  selectedPlayerId: string | null
  setSelectedPlayerId: (id: string | null) => void
  swapPlayers: (aId: string, bId: string) => void
  setFormation: (formation: FormationId) => void
  buyPlayer: (playerId: string) => { ok: true } | { ok: false; reason: string }
  playMatch: () => MatchResult | null
  resetSeason: () => void
  playableSquad: Player[]
  marketList: Player[]
  nextOpponent: { id: string; name: string; shortName: string } | null
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => makeGameState())
  const [tab, setTab] = useState<TabId>('merkez')
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)

  const playableSquad = useMemo(
    () =>
      state.players
        .filter((p) => p.clubId === state.playableClubId)
        .sort((a, b) => {
          if (a.isStarter !== b.isStarter) return a.isStarter ? -1 : 1
          const order = { gk: 0, df: 1, mf: 2, fw: 3 }
          if (a.position !== b.position) return order[a.position] - order[b.position]
          return b.ovr - a.ovr
        }),
    [state.players, state.playableClubId],
  )

  const marketList = useMemo(
    () =>
      state.players
        .filter((p) => p.clubId === null)
        .sort((a, b) => b.ovr - a.ovr),
    [state.players],
  )

  const nextOpponent = useMemo(() => {
    const id = state.fixtureOrder[state.fixtureIndex % state.fixtureOrder.length]
    const club = state.clubs.find((c) => c.id === id)
    return club ? { id: club.id, name: club.name, shortName: club.shortName } : null
  }, [state.clubs, state.fixtureIndex, state.fixtureOrder])

  const swapPlayers = useCallback((aId: string, bId: string) => {
    setState((prev) => {
      const a = prev.players.find((p) => p.id === aId)
      const b = prev.players.find((p) => p.id === bId)
      if (!a || !b) return prev
      if (a.clubId !== prev.playableClubId || b.clubId !== prev.playableClubId) return prev
      // Swap starter flags only when one is starter and one is bench — XI stays 11
      if (a.isStarter === b.isStarter) return prev
      return {
        ...prev,
        players: prev.players.map((p) => {
          if (p.id === aId) return { ...p, isStarter: b.isStarter }
          if (p.id === bId) return { ...p, isStarter: a.isStarter }
          return p
        }),
      }
    })
    setSelectedPlayerId(null)
  }, [])

  const setFormation = useCallback((formation: FormationId) => {
    setState((prev) => ({
      ...prev,
      formation,
      players: applyFormationToSquad(prev.players, prev.playableClubId, formation),
    }))
  }, [])

  const buyPlayer = useCallback((playerId: string) => {
    let outcome: { ok: true } | { ok: false; reason: string } = { ok: false, reason: 'Bilinmeyen hata' }
    setState((prev) => {
      const player = prev.players.find((p) => p.id === playerId)
      if (!player || player.clubId !== null) {
        outcome = { ok: false, reason: 'Oyuncu piyasada değil' }
        return prev
      }
      if (player.value > prev.transferBudget) {
        outcome = { ok: false, reason: 'Bütçe yetersiz' }
        return prev
      }
      outcome = { ok: true }
      return {
        ...prev,
        transferBudget: prev.transferBudget - player.value,
        players: prev.players.map((p) =>
          p.id === playerId
            ? { ...p, clubId: prev.playableClubId, isStarter: false, onMarket: false }
            : p,
        ),
      }
    })
    return outcome
  }, [])

  const playMatch = useCallback((): MatchResult | null => {
    let result: MatchResult | null = null
    setState((prev) => {
      const starters = prev.players.filter(
        (p) => p.clubId === prev.playableClubId && p.isStarter,
      )
      if (starters.length !== 11) return prev
      // If Strict Mode re-runs this updater, reuse the already-chosen result
      // by short-circuiting when lastMatch already advanced from same fixture.
      const sim = simulateMatch(prev)
      result = sim.result
      return sim.next
    })
    return result
  }, [])

  const resetSeason = useCallback(() => {
    setState(makeGameState())
    setSelectedPlayerId(null)
    setTab('merkez')
  }, [])

  const value: GameContextValue = {
    state,
    tab,
    setTab,
    selectedPlayerId,
    setSelectedPlayerId,
    swapPlayers,
    setFormation,
    buyPlayer,
    playMatch,
    resetSeason,
    playableSquad,
    marketList,
    nextOpponent,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
