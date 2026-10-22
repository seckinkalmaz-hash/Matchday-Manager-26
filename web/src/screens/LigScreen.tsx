import { rankedStandings } from '../lib/matchSim'
import { useGame } from '../store/GameContext'
import { goalDifference, points } from '../types'

export function LigScreen() {
  const { state } = useGame()
  const ranked = rankedStandings(state.standings)

  return (
    <div className="screen lig">
      <header className="screen__header">
        <h1>Lig</h1>
        <p className="muted">{state.leagueName}</p>
      </header>

      <div className="table-wrap">
        <table className="league-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Kulüp</th>
              <th>O</th>
              <th>G</th>
              <th>B</th>
              <th>M</th>
              <th>Av</th>
              <th>P</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((row, i) => {
              const club = state.clubs.find((c) => c.id === row.clubId)
              const isUs = row.clubId === state.playableClubId
              return (
                <tr key={row.clubId} className={isUs ? 'is-playable' : undefined}>
                  <td>{i + 1}</td>
                  <td className="club-cell">
                    <span className="mini-badge">{club?.shortName}</span>
                    {club?.name}
                  </td>
                  <td>{row.played}</td>
                  <td>{row.won}</td>
                  <td>{row.drawn}</td>
                  <td>{row.lost}</td>
                  <td>{goalDifference(row)}</td>
                  <td className="pts">{points(row)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
