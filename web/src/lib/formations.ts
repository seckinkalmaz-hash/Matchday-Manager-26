import type { FormationId, Player, Position } from '../types'

export interface PitchSlot {
  id: string
  position: Position
  /** 0–100 from left */
  x: number
  /** 0–100 from top (attacking upward) */
  y: number
}

export const FORMATIONS: Record<FormationId, PitchSlot[]> = {
  '4-3-3': [
    { id: 'gk', position: 'gk', x: 50, y: 90 },
    { id: 'lb', position: 'df', x: 15, y: 72 },
    { id: 'lcb', position: 'df', x: 35, y: 76 },
    { id: 'rcb', position: 'df', x: 65, y: 76 },
    { id: 'rb', position: 'df', x: 85, y: 72 },
    { id: 'lcm', position: 'mf', x: 25, y: 50 },
    { id: 'cm', position: 'mf', x: 50, y: 54 },
    { id: 'rcm', position: 'mf', x: 75, y: 50 },
    { id: 'lw', position: 'fw', x: 18, y: 24 },
    { id: 'st', position: 'fw', x: 50, y: 18 },
    { id: 'rw', position: 'fw', x: 82, y: 24 },
  ],
  '3-5-2': [
    { id: 'gk', position: 'gk', x: 50, y: 90 },
    { id: 'lcb', position: 'df', x: 25, y: 74 },
    { id: 'cb', position: 'df', x: 50, y: 78 },
    { id: 'rcb', position: 'df', x: 75, y: 74 },
    { id: 'lwb', position: 'mf', x: 10, y: 48 },
    { id: 'lcm', position: 'mf', x: 32, y: 52 },
    { id: 'cm', position: 'mf', x: 50, y: 56 },
    { id: 'rcm', position: 'mf', x: 68, y: 52 },
    { id: 'rwb', position: 'mf', x: 90, y: 48 },
    { id: 'lst', position: 'fw', x: 35, y: 20 },
    { id: 'rst', position: 'fw', x: 65, y: 20 },
  ],
}

export const FORMATION_COUNTS: Record<FormationId, Record<Position, number>> = {
  '4-3-3': { gk: 1, df: 4, mf: 3, fw: 3 },
  '3-5-2': { gk: 1, df: 3, mf: 5, fw: 2 },
}

const POS_ORDER: Position[] = ['gk', 'df', 'mf', 'fw']

/**
 * Rebuild starters to match formation slot counts: pick highest OVR per needed
 * position from the squad, fill shortages from adjacent outfield roles.
 */
export function applyFormationToSquad(players: Player[], clubId: string, formation: FormationId): Player[] {
  const counts = FORMATION_COUNTS[formation]
  const squad = players.filter((p) => p.clubId === clubId)
  const others = players.filter((p) => p.clubId !== clubId)
  const selected = new Set<string>()
  const starters: Player[] = []

  for (const pos of POS_ORDER) {
    const need = counts[pos]
    const pool = squad
      .filter((p) => p.position === pos && !selected.has(p.id))
      .sort((a, b) => b.ovr - a.ovr)
    for (let i = 0; i < need && i < pool.length; i++) {
      selected.add(pool[i].id)
      starters.push(pool[i])
    }
  }

  // Fill shortages from any remaining outfield (never steal an extra GK if we have one)
  while (starters.length < 11) {
    const pool = squad
      .filter((p) => !selected.has(p.id) && (p.position !== 'gk' || starters.every((s) => s.position !== 'gk')))
      .sort((a, b) => b.ovr - a.ovr)
    if (pool.length === 0) break
    selected.add(pool[0].id)
    starters.push(pool[0])
  }

  const mapped = squad.map((p) => ({
    ...p,
    isStarter: selected.has(p.id),
  }))

  return [...others, ...mapped]
}

/** Map current starters onto pitch slots by position order (highest OVR first within slot). */
export function assignStartersToSlots(
  starters: Player[],
  formation: FormationId,
): Array<{ slot: PitchSlot; player: Player | null }> {
  const slots = FORMATIONS[formation]
  const used = new Set<string>()
  return slots.map((slot) => {
    const candidate = starters
      .filter((p) => p.position === slot.position && !used.has(p.id))
      .sort((a, b) => b.ovr - a.ovr)[0]
    if (candidate) {
      used.add(candidate.id)
      return { slot, player: candidate }
    }
    // Fallback: any unused starter
    const any = starters.find((p) => !used.has(p.id))
    if (any) {
      used.add(any.id)
      return { slot, player: any }
    }
    return { slot, player: null }
  })
}
