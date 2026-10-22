import type { Club, GameState, MatchResult, MatchResultMark, Player, Standing } from '../types'
import { goalDifference, points } from '../types'

function avgStarterOvr(players: Player[], clubId: string): number {
  const starters = players.filter((p) => p.clubId === clubId && p.isStarter)
  if (starters.length === 0) return 60
  return starters.reduce((sum, p) => sum + p.ovr, 0) / starters.length
}

function sampleGoals(attack: number, defense: number): number {
  const edge = (attack - defense) / 20
  const expected = Math.max(0.4, Math.min(3.2, 1.35 + edge + (Math.random() - 0.5) * 0.6))
  // Poisson-ish via repeated Bernoulli
  let goals = 0
  const trials = 6
  const p = expected / trials
  for (let i = 0; i < trials; i++) {
    if (Math.random() < p) goals++
  }
  return goals
}

export function simulateMatch(state: GameState): {
  next: GameState
  result: MatchResult
  mark: MatchResultMark
} {
  const home = state.clubs.find((c) => c.id === state.playableClubId)!
  const awayId = state.fixtureOrder[state.fixtureIndex % state.fixtureOrder.length]
  const away = state.clubs.find((c) => c.id === awayId)!

  const homeOvr = avgStarterOvr(state.players, home.id)
  const awayOvr = away.strength

  const homeGoals = sampleGoals(homeOvr, awayOvr)
  const awayGoals = sampleGoals(awayOvr, homeOvr)

  let mark: MatchResultMark
  let prize = 150_000
  if (homeGoals > awayGoals) {
    mark = 'win'
    prize = 450_000 + (homeGoals - awayGoals) * 50_000
  } else if (homeGoals === awayGoals) {
    mark = 'draw'
    prize = 250_000
  } else {
    mark = 'loss'
    prize = 100_000
  }

  const result: MatchResult = {
    homeClubId: home.id,
    awayClubId: away.id,
    homeGoals,
    awayGoals,
    prize,
  }

  const standings = updateStandings(state.standings, home, away, homeGoals, awayGoals)
  const recentForm = [...state.recentForm.slice(-4), mark]
  const nextIndex = (state.fixtureIndex + 1) % state.fixtureOrder.length

  const next: GameState = {
    ...state,
    standings,
    recentForm,
    transferBudget: state.transferBudget + prize,
    fixtureIndex: nextIndex,
    lastMatch: result,
    matchday: state.matchday + 1,
  }

  return { next, result, mark }
}

function updateStandings(
  standings: Standing[],
  home: Club,
  away: Club,
  homeGoals: number,
  awayGoals: number,
): Standing[] {
  return standings.map((row) => {
    if (row.clubId === home.id) {
      return applyResult(row, homeGoals, awayGoals)
    }
    if (row.clubId === away.id) {
      return applyResult(row, awayGoals, homeGoals)
    }
    return row
  })
}

function applyResult(row: Standing, gf: number, ga: number): Standing {
  const won = gf > ga ? 1 : 0
  const drawn = gf === ga ? 1 : 0
  const lost = gf < ga ? 1 : 0
  return {
    ...row,
    played: row.played + 1,
    won: row.won + won,
    drawn: row.drawn + drawn,
    lost: row.lost + lost,
    goalsFor: row.goalsFor + gf,
    goalsAgainst: row.goalsAgainst + ga,
  }
}

export function rankedStandings(standings: Standing[]): Standing[] {
  return [...standings].sort((a, b) => {
    const pts = points(b) - points(a)
    if (pts !== 0) return pts
    const gd = goalDifference(b) - goalDifference(a)
    if (gd !== 0) return gd
    return b.goalsFor - a.goalsFor
  })
}
