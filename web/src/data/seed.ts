import type { Club, GameState, Player, Standing } from '../types'

/**
 * Personal-use static seed (Süper Lig–style names).
 * Not licensed for App Store / public marketing / commercial distribution.
 */

const GS = 'club-galatasaray'
const FB = 'club-fenerbahce'
const BJK = 'club-besiktas'
const TS = 'club-trabzonspor'
const BAS = 'club-basaksehir'
const ANT = 'club-antalyaspor'
const KON = 'club-konyaspor'
const SIV = 'club-sivasspor'

const PLAYABLE = GS

export const clubs: Club[] = [
  { id: GS, name: 'Galatasaray', shortName: 'GS', isPlayable: true, strength: 82 },
  { id: FB, name: 'Fenerbahçe', shortName: 'FB', isPlayable: false, strength: 81 },
  { id: BJK, name: 'Beşiktaş', shortName: 'BJK', isPlayable: false, strength: 76 },
  { id: TS, name: 'Trabzonspor', shortName: 'TS', isPlayable: false, strength: 74 },
  { id: BAS, name: 'Başakşehir', shortName: 'İBFK', isPlayable: false, strength: 72 },
  { id: ANT, name: 'Antalyaspor', shortName: 'ANT', isPlayable: false, strength: 69 },
  { id: KON, name: 'Konyaspor', shortName: 'KON', isPlayable: false, strength: 68 },
  { id: SIV, name: 'Sivasspor', shortName: 'SIV', isPlayable: false, strength: 66 },
]

function p(
  id: string,
  name: string,
  position: Player['position'],
  ovr: number,
  value: number,
  isStarter: boolean,
  clubId: string | null = PLAYABLE,
): Player {
  return { id, name, position, ovr, value, clubId, isStarter, onMarket: clubId === null }
}

/** Playable Galatasaray squad — static personal-use seed (approximate OVRs). */
export const squad: Player[] = [
  p('p-muslera', 'Fernando Muslera', 'gk', 80, 2_500_000, true),
  p('p-davinson', 'Davinson Sánchez', 'df', 79, 18_000_000, true),
  p('p-abdulkerim', 'Abdülkerim Bardakcı', 'df', 77, 12_000_000, true),
  p('p-jakobs', 'Ismail Jakobs', 'df', 75, 9_000_000, true),
  p('p-jelert', 'Elias Jelert', 'df', 74, 8_500_000, true),
  p('p-torreira', 'Lucas Torreira', 'mf', 80, 15_000_000, true),
  p('p-sara', 'Gabriel Sara', 'mf', 78, 22_000_000, true),
  p('p-demirbay', 'Kerem Demirbay', 'mf', 76, 6_000_000, true),
  p('p-osimhen', 'Victor Osimhen', 'fw', 88, 75_000_000, true),
  p('p-icardi', 'Mauro Icardi', 'fw', 84, 20_000_000, true),
  p('p-baris', 'Barış Alper Yılmaz', 'fw', 78, 25_000_000, true),
  p('p-gunay', 'Günay Güvenç', 'gk', 72, 1_200_000, false),
  p('p-kaan', 'Kaan Ayhan', 'df', 74, 4_500_000, false),
  p('p-yunus', 'Yunus Akgün', 'mf', 76, 14_000_000, false),
  p('p-mertens', 'Dries Mertens', 'fw', 79, 3_500_000, false),
]

/** Transfer market: stars + free agents (static personal-use names). */
export const marketPlayers: Player[] = [
  p('m-star1', 'Erling Haaland', 'fw', 91, 180_000_000, false, null),
  p('m-star2', 'Kevin De Bruyne', 'mf', 88, 45_000_000, false, null),
  p('m-star3', 'Virgil van Dijk', 'df', 87, 25_000_000, false, null),
  p('m-star4', 'Thibaut Courtois', 'gk', 89, 30_000_000, false, null),
  p('m-star5', 'Mohamed Salah', 'fw', 89, 55_000_000, false, null),
  p('m-star6', 'Jude Bellingham', 'mf', 90, 150_000_000, false, null),
  p('m-mid1', 'Hakan Çalhanoğlu', 'mf', 84, 35_000_000, false, null),
  p('m-mid2', 'Cengiz Ünder', 'fw', 77, 12_000_000, false, null),
  p('m-mid3', 'Çağlar Söyüncü', 'df', 78, 15_000_000, false, null),
  p('m-mid4', 'Orkun Kökçü', 'mf', 79, 28_000_000, false, null),
  p('m-mid5', 'Kenan Yıldız', 'fw', 78, 40_000_000, false, null),
  p('m-free1', 'Okay Yokuşlu', 'mf', 74, 0, false, null),
  p('m-free2', 'Enes Ünal', 'fw', 76, 0, false, null),
  p('m-free3', 'Ozan Kabak', 'df', 75, 0, false, null),
  p('m-free4', 'Uğurcan Çakır', 'gk', 78, 0, false, null),
  p('m-free5', 'Dorukhan Toköz', 'mf', 72, 0, false, null),
]

const standingSeeds: Array<[string, number, number, number, number, number]> = [
  // clubID, W, D, L, GF, GA — mid-season-ish
  [FB, 8, 1, 1, 22, 8],
  [GS, 7, 2, 1, 24, 10],
  [BJK, 6, 2, 2, 18, 11],
  [TS, 5, 3, 2, 16, 12],
  [BAS, 4, 3, 3, 14, 13],
  [ANT, 3, 2, 5, 11, 15],
  [KON, 2, 3, 5, 9, 16],
  [SIV, 1, 2, 7, 7, 19],
]

export const standings: Standing[] = standingSeeds.map(
  ([clubId, won, drawn, lost, goalsFor, goalsAgainst]) => ({
    clubId,
    played: won + drawn + lost,
    won,
    drawn,
    lost,
    goalsFor,
    goalsAgainst,
  }),
)

/** Fixture rotation — first opponent Beşiktaş. */
export const fixtureOrder = [BJK, TS, BAS, ANT, KON, SIV, FB]

export function makeGameState(): GameState {
  return {
    clubs,
    players: [...squad, ...marketPlayers.map((pl) => ({ ...pl }))],
    standings: standings.map((s) => ({ ...s })),
    transferBudget: 45_000_000,
    playableClubId: PLAYABLE,
    fixtureIndex: 0,
    fixtureOrder: [...fixtureOrder],
    recentForm: ['win', 'win', 'win', 'draw', 'win'],
    leagueName: 'Süper Lig',
    formation: '4-3-3',
    lastMatch: null,
    matchday: 11,
  }
}

export { PLAYABLE }
