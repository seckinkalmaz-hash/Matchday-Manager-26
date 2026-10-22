import { useState } from 'react'
import { formatEuro } from '../lib/format'
import { useGame } from '../store/GameContext'
import { FORM_MARK } from '../types'

export function MerkezScreen() {
  const { state, nextOpponent, playMatch, setTab } = useGame()
  const [flash, setFlash] = useState<string | null>(null)
  const club = state.clubs.find((c) => c.id === state.playableClubId)
  const starters = state.players.filter(
    (p) => p.clubId === state.playableClubId && p.isStarter,
  ).length

  const onPlay = () => {
    if (starters !== 11) {
      setFlash('İlk 11 eksik — Kadro sekmesine git')
      return
    }
    const result = playMatch()
    if (!result || !nextOpponent) return
    const opp = state.clubs.find((c) => c.id === result.awayClubId)
    setFlash(
      `${club?.shortName ?? 'PGS'} ${result.homeGoals}–${result.awayGoals} ${opp?.shortName ?? '???'} · +${formatEuro(result.prize)}`,
    )
  }

  return (
    <div className="screen merkez">
      <header className="screen__header">
        <p className="eyebrow">{state.leagueName}</p>
        <h1>{club?.name ?? 'Kulüp'}</h1>
        <p className="muted">Maç günü {state.matchday}</p>
      </header>

      <section className="card">
        <p className="card__label">Sıradaki Maç</p>
        <div className="matchup">
          <span className="badge">{club?.shortName ?? '—'}</span>
          <span className="vs">vs</span>
          <span className="badge">{nextOpponent?.shortName ?? '—'}</span>
          <div className="matchup__meta">
            <strong>{nextOpponent?.name ?? 'Rakip yok'}</strong>
            <span className="muted">Deplasman</span>
          </div>
        </div>
      </section>

      <section className="card">
        <p className="card__label">Son Form</p>
        <div className="form-row">
          {state.recentForm.map((mark, i) => (
            <span key={`${mark}-${i}`} className={`form-pill form-pill--${mark}`} title={FORM_MARK[mark].label}>
              {FORM_MARK[mark].letter}
            </span>
          ))}
        </div>
      </section>

      <section className="card">
        <p className="card__label">Transfer Bütçesi</p>
        <p className="budget">{formatEuro(state.transferBudget)}</p>
      </section>

      {state.lastMatch && (
        <section className="card card--result">
          <p className="card__label">Son Skor</p>
          <p className="result-score">
            {state.clubs.find((c) => c.id === state.lastMatch!.homeClubId)?.shortName}{' '}
            {state.lastMatch.homeGoals}–{state.lastMatch.awayGoals}{' '}
            {state.clubs.find((c) => c.id === state.lastMatch!.awayClubId)?.shortName}
          </p>
          <button type="button" className="linkish" onClick={() => setTab('lig')}>
            Lig tablosuna bak →
          </button>
        </section>
      )}

      {flash && <p className="flash" role="status">{flash}</p>}

      <div className="cta-bar">
        <button type="button" className="cta" onClick={onPlay}>
          Maça Çık
        </button>
      </div>
    </div>
  )
}
