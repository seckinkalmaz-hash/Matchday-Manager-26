import Foundation

/// Recent form marks shown on Merkez (Turkish letters).
enum MatchResultMark: String, Codable, CaseIterable {
    case win = "G"
    case draw = "B"
    case loss = "M"

    var label: String {
        switch self {
        case .win: return "Galibiyet"
        case .draw: return "Beraberlik"
        case .loss: return "Mağlubiyet"
        }
    }
}
