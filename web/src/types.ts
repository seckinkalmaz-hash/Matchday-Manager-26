export type Position = 'gk' | 'df' | 'mf' | 'fw'

export type MatchResultMark = 'win' | 'draw' | 'loss'

export type FormationId = '4-3-3' | '3-5-2'

export type TabId = 'merkez' | 'kadro' | 'taktik' | 'transfer' | 'lig'

export interface Club {
  id: string
  name: string
  shortName: string
  isPlayable: boolean
  /** Rough team strength used by basic match sim for AI clubs. */
  strength: number
}

export interface Player {
  id: string
  name: string
  position: Position
  ovr: number
  value: number
  clubId: string | null
  isStarter: boolean
  /** Free agent / market listing flag when clubId is null. */
  onMarket?: boolean
}

export interface Standing {
  clubId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
}

export interface MatchResult {
  homeClubId: string
  awayClubId: string
  homeGoals: number
  awayGoals: number
  prize: number
}

export interface GameState {
  clubs: Club[]
  players: Player[]
  standings: Standing[]
  transferBudget: number
  playableClubId: string
  fixtureIndex: number
  fixtureOrder: string[]
  recentForm: MatchResultMark[]
  leagueName: string
  formation: FormationId
  lastMatch: MatchResult | null
  matchday: number
}

export const POSITION_LABEL: Record<Position, string> = {
  gk: 'Kaleci',
  df: 'Defans',
  mf: 'Orta Saha',
  fw: 'Forvet',
}

export const POSITION_SHORT: Record<Position, string> = {
  gk: 'KL',
  df: 'DF',
  mf: 'OS',
  fw: 'FV',
}

export const FORM_MARK: Record<MatchResultMark, { letter: string; label: string }> = {
  win: { letter: 'G', label: 'Galibiyet' },
  draw: { letter: 'B', label: 'Beraberlik' },
  loss: { letter: 'M', label: 'Mağlubiyet' },
}

export function goalDifference(s: Standing): number {
  return s.goalsFor - s.goalsAgainst
}

export function points(s: Standing): number {
  return s.won * 3 + s.drawn
}
