import { BottomNav } from './components/BottomNav'
import { MerkezScreen } from './screens/MerkezScreen'
import { KadroScreen } from './screens/KadroScreen'
import { TaktikScreen } from './screens/TaktikScreen'
import { TransferScreen } from './screens/TransferScreen'
import { LigScreen } from './screens/LigScreen'
import { GameProvider, useGame } from './store/GameContext'

function ScreenRouter() {
  const { tab } = useGame()
  switch (tab) {
    case 'merkez':
      return <MerkezScreen />
    case 'kadro':
      return <KadroScreen />
    case 'taktik':
      return <TaktikScreen />
    case 'transfer':
      return <TransferScreen />
    case 'lig':
      return <LigScreen />
  }
}

function Shell() {
  return (
    <div className="phone-shell">
      <div className="app-frame">
        <main className="app-main">
          <ScreenRouter />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  )
}
