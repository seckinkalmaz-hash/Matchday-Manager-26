import { useGame } from '../store/GameContext'
import { POSITION_SHORT } from '../types'

export function KadroScreen() {
  const {
    playableSquad,
    selectedPlayerId,
    setSelectedPlayerId,
    swapPlayers,
  } = useGame()

  const starters = playableSquad.filter((p) => p.isStarter)
  const bench = playableSquad.filter((p) => !p.isStarter)

  const onTap = (id: string) => {
    if (!selectedPlayerId) {
      setSelectedPlayerId(id)
      return
    }
    if (selectedPlayerId === id) {
      setSelectedPlayerId(null)
      return
    }
    const a = playableSquad.find((p) => p.id === selectedPlayerId)
    const b = playableSquad.find((p) => p.id === id)
    if (a && b && a.isStarter !== b.isStarter) {
      swapPlayers(a.id, b.id)
    } else {
      setSelectedPlayerId(id)
    }
  }

  return (
    <div className="screen kadro">
      <header className="screen__header">
        <h1>Kadro</h1>
        <p className="muted">
          İlk 11: {starters.length}/11 · Yedek seçip değiştir
        </p>
      </header>

      {selectedPlayerId && (
        <p className="hint" role="status">
          Değiştirmek için diğer gruptan bir oyuncu seç
        </p>
      )}

      <section>
        <h2 className="section-title">İlk 11</h2>
        <ul className="player-list">
          {starters.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`player-row${selectedPlayerId === p.id ? ' is-selected' : ''}`}
                onClick={() => onTap(p.id)}
              >
                <span className="pos">{POSITION_SHORT[p.position]}</span>
                <span className="pname">{p.name}</span>
                <span className="povr">{p.ovr}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-title">Yedek</h2>
        <ul className="player-list">
          {bench.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`player-row${selectedPlayerId === p.id ? ' is-selected' : ''}`}
                onClick={() => onTap(p.id)}
              >
                <span className="pos">{POSITION_SHORT[p.position]}</span>
                <span className="pname">{p.name}</span>
                <span className="povr">{p.ovr}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
