import { assignStartersToSlots } from '../lib/formations'
import type { FormationId, Player } from '../types'
import { POSITION_SHORT } from '../types'

interface PitchProps {
  formation: FormationId
  starters: Player[]
}

export function Pitch({ formation, starters }: PitchProps) {
  const mapped = assignStartersToSlots(starters, formation)

  return (
    <div className="pitch" role="img" aria-label={`${formation} diziliş`}>
      <div className="pitch__field">
        <div className="pitch__half-line" />
        <div className="pitch__circle" />
        <div className="pitch__box pitch__box--top" />
        <div className="pitch__box pitch__box--bottom" />
        {mapped.map(({ slot, player }) => (
          <div
            key={slot.id}
            className="pitch__slot"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          >
            <div className={`pitch__badge${player ? '' : ' is-empty'}`}>
              <span className="pitch__ovr">{player ? player.ovr : '—'}</span>
              <span className="pitch__name">
                {player ? shortName(player.name) : POSITION_SHORT[slot.position]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function shortName(name: string): string {
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0].slice(0, 8)
  return parts[parts.length - 1].slice(0, 8)
}
