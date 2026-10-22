import Foundation

enum Position: String, Codable, CaseIterable, Identifiable {
    case gk = "KL"
    case df = "DF"
    case mf = "OS"
    case fw = "FV"

    var id: String { rawValue }

    var label: String {
        switch self {
        case .gk: return "Kaleci"
        case .df: return "Defans"
        case .mf: return "Orta Saha"
        case .fw: return "Forvet"
        }
    }
}
