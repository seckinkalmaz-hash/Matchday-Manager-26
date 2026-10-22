import type { Club, GameState, Player, Standing } from '../types'

const PLAYABLE = 'club-pogaz'
const ENK = 'club-enkara'
const EZM = 'club-ezmir'
const MRD = 'club-maradeniz'
const OGE = 'club-oge'
const PRK = 'club-prakya'
const OKD = 'club-okdeniz'
const END = 'club-endolu'

export const clubs: Club[] = [
  { id: PLAYABLE, name: 'Pogaz SK', shortName: 'PGS', isPlayable: true, strength: 73 },
  { id: ENK, name: 'Enkara Işığı', shortName: 'ENK', isPlayable: false, strength: 78 },
  { id: EZM, name: 'Ezmir Meltemi', shortName: 'EZM', isPlayable: false, strength: 76 },
  { id: MRD, name: 'Maradeniz SK', shortName: 'MRD', isPlayable: false, strength: 72 },
  { id: OGE, name: 'Oge Alevi', shortName: 'OGE', isPlayable: false, strength: 70 },
  { id: PRK, name: 'Prakya Birliği', shortName: 'PRK', isPlayable: false, strength: 68 },
  { id: OKD, name: 'Okdeniz Gücü', shortName: 'OKD', isPlayable: false, strength: 65 },
  { id: END, name: 'Endolu Kartalı', shortName: 'END', isPlayable: false, strength: 74 },
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

/** Playable Pogaz SK squad — mirrors iOS SeedData fictional names. */
export const squad: Player[] = [
  p('p-omre', 'Omre Maya', 'gk', 74, 4_500_000, true),
  p('p-zan', 'Zan Remir', 'df', 72, 3_800_000, true),
  p('p-derk', 'Derk Eydın', 'df', 71, 3_200_000, true),
  p('p-musuf', 'Musuf Şelik', 'df', 70, 2_900_000, true),
  p('p-nert', 'Nert Tahin', 'df', 69, 2_400_000, true),
  p('p-ezan', 'Ezan Kılmaz', 'mf', 76, 6_500_000, true),
  p('p-durak', 'Durak Erslan', 'mf', 73, 4_100_000, true),
  p('p-merem', 'Merem Üz', 'mf', 72, 3_700_000, true),
  p('p-eli', 'Eli Moç', 'fw', 75, 5_800_000, true),
  p('p-jakan', 'Jakan Rolat', 'fw', 74, 5_200_000, true),
  p('p-feniz', 'Feniz Eksöy', 'fw', 71, 3_500_000, true),
  p('p-terkan', 'Terkan Hüneş', 'gk', 68, 1_800_000, false),
  p('p-volga', 'Volga Ir', 'df', 66, 1_200_000, false),
  p('p-unur', 'Unur Daş', 'mf', 67, 1_500_000, false),
  p('p-ife', 'Ife Murt', 'fw', 65, 900_000, false),
]

/** Transfer market: stars (priced) + free agents (value 0 / low). Fictional only. */
export const marketPlayers: Player[] = [
  p('m-star1', 'Kadir Vento', 'fw', 82, 14_000_000, false, null),
  p('m-star2', 'Luka Sereno', 'mf', 80, 11_500_000, false, null),
  p('m-star3', 'Boran Quill', 'df', 79, 9_800_000, false, null),
  p('m-star4', 'Niko Halet', 'gk', 78, 7_200_000, false, null),
  p('m-star5', 'Sami Drax', 'fw', 77, 8_400_000, false, null),
  p('m-star6', 'Rui Mender', 'mf', 76, 6_900_000, false, null),
  p('m-free1', 'Taro Veld', 'df', 64, 0, false, null),
  p('m-free2', 'Ilmi Kor', 'mf', 63, 0, false, null),
  p('m-free3', 'Pavel Roon', 'fw', 62, 0, false, null),
  p('m-free4', 'Enes Drift', 'gk', 61, 0, false, null),
  p('m-free5', 'Yago Nul', 'df', 60, 0, false, null),
  p('m-mid1', 'Cemil Faro', 'mf', 71, 2_800_000, false, null),
  p('m-mid2', 'Orhan Vale', 'fw', 70, 2_400_000, false, null),
  p('m-mid3', 'Mert Oxa', 'df', 69, 2_100_000, false, null),
]

const standingSeeds: Array<[string, number, number, number, number, number]> = [
  [ENK, 7, 2, 1, 18, 8],
  [EZM, 6, 3, 1, 16, 9],
  [END, 5, 3, 2, 14, 10],
  [PLAYABLE, 4, 3, 3, 13, 12],
  [MRD, 4, 2, 4, 12, 13],
  [OGE, 3, 3, 4, 11, 14],
  [PRK, 2, 2, 6, 9, 16],
  [OKD, 1, 2, 7, 7, 18],
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

/** Home/away style rotation — first fixture is Maradeniz (matches iOS seed). */
export const fixtureOrder = [MRD, OGE, PRK, OKD, END, ENK, EZM]

export function makeGameState(): GameState {
  return {
    clubs,
    players: [...squad, ...marketPlayers.map((pl) => ({ ...pl }))],
    standings: standings.map((s) => ({ ...s })),
    transferBudget: 12_500_000,
    playableClubId: PLAYABLE,
    fixtureIndex: 0,
    fixtureOrder: [...fixtureOrder],
    recentForm: ['win', 'win', 'draw', 'loss', 'win'],
    leagueName: 'Endolu Ligi',
    formation: '4-3-3',
    lastMatch: null,
    matchday: 11,
  }
}

export { PLAYABLE }
