import { useState } from 'react'
import { formatEuro } from '../lib/format'
import { useGame } from '../store/GameContext'
import { POSITION_SHORT } from '../types'

export function TransferScreen() {
  const { state, marketList, buyPlayer } = useGame()
  const [msg, setMsg] = useState<string | null>(null)

  const onBuy = (id: string, name: string) => {
    const res = buyPlayer(id)
    if (res.ok) {
      setMsg(`${name} kadroya katıldı`)
    } else {
      setMsg(res.reason)
    }
  }

  return (
    <div className="screen transfer">
      <header className="screen__header">
        <h1>Transfer</h1>
        <p className="budget-inline">Bütçe: {formatEuro(state.transferBudget)}</p>
      </header>

      {msg && (
        <p className="flash" role="status">
          {msg}
        </p>
      )}

      <ul className="player-list market">
        {marketList.map((p) => {
          const free = p.value === 0
          const canBuy = p.value <= state.transferBudget
          return (
            <li key={p.id} className="market-row">
              <div className="market-row__info">
                <span className="pos">{POSITION_SHORT[p.position]}</span>
                <div>
                  <strong>{p.name}</strong>
                  <span className="muted">
                    {free ? 'Serbest' : 'Yıldız'} · OVR {p.ovr}
                  </span>
                </div>
              </div>
              <div className="market-row__actions">
                <span className="price">{free ? 'Ücretsiz' : formatEuro(p.value)}</span>
                <button
                  type="button"
                  className="buy"
                  disabled={!canBuy}
                  onClick={() => onBuy(p.id, p.name)}
                >
                  Al
                </button>
              </div>
            </li>
          )
        })}
        {marketList.length === 0 && (
          <li className="muted empty">Piyasa boş — tüm hedefler alındı.</li>
        )}
      </ul>
    </div>
  )
}
