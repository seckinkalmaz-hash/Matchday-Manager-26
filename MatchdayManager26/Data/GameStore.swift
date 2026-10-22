import Foundation
import Observation

@Observable
@MainActor
final class GameStore {
    private(set) var state: GameState

    init(state: GameState = SeedData.makeGameState()) {
        self.state = state
    }

    var transferBudgetText: String {
        Self.formatEuro(state.transferBudget)
    }

    static func formatEuro(_ value: Int) -> String {
        if value >= 1_000_000 {
            let millions = Double(value) / 1_000_000
            let formatted = String(format: millions.truncatingRemainder(dividingBy: 1) == 0 ? "%.0f" : "%.1f", millions)
            return "€\(formatted)M"
        }
        if value >= 1_000 {
            let thousands = Double(value) / 1_000
            let formatted = String(format: thousands.truncatingRemainder(dividingBy: 1) == 0 ? "%.0f" : "%.1f", thousands)
            return "€\(formatted)K"
        }
        return "€\(value)"
    }
}
