import type { TabId } from '../types'
import { useGame } from '../store/GameContext'

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'merkez', label: 'Merkez' },
  { id: 'kadro', label: 'Kadro' },
  { id: 'taktik', label: 'Taktik' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'lig', label: 'Lig' },
]

export function BottomNav() {
  const { tab, setTab } = useGame()

  return (
    <nav className="bottom-nav" aria-label="Ana sekmeler">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`bottom-nav__item${tab === t.id ? ' is-active' : ''}`}
          onClick={() => setTab(t.id)}
          aria-current={tab === t.id ? 'page' : undefined}
        >
          <span className="bottom-nav__dot" aria-hidden />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
