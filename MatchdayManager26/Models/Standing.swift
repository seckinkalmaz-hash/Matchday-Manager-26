import Foundation

struct Standing: Identifiable, Codable, Hashable {
    var id: UUID { clubID }
    let clubID: UUID
    var played: Int
    var won: Int
    var drawn: Int
    var lost: Int
    var goalsFor: Int
    var goalsAgainst: Int

    var goalDifference: Int { goalsFor - goalsAgainst }
    var points: Int { won * 3 + drawn }
}
