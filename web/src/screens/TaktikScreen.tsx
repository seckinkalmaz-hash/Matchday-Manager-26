import { Pitch } from '../components/Pitch'
import { useGame } from '../store/GameContext'
import type { FormationId } from '../types'

const OPTIONS: FormationId[] = ['4-3-3', '3-5-2']

export function TaktikScreen() {
  const { state, playableSquad, setFormation } = useGame()
  const starters = playableSquad.filter((p) => p.isStarter)

  return (
    <div className="screen taktik">
      <header className="screen__header">
        <h1>Taktik</h1>
        <p className="muted">Diziliş sahaya yansır</p>
      </header>

      <div className="formation-toggle" role="group" aria-label="Formasyon">
        {OPTIONS.map((f) => (
          <button
            key={f}
            type="button"
            className={`chip${state.formation === f ? ' is-active' : ''}`}
            onClick={() => setFormation(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <Pitch formation={state.formation} starters={starters} />
    </div>
  )
}
