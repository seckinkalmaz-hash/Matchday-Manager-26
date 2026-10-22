import Foundation

struct GameState: Codable {
    var clubs: [Club]
    var players: [Player]
    var standings: [Standing]
    var transferBudget: Int
    var playableClubID: UUID
    var nextOpponentClubID: UUID
    var recentForm: [MatchResultMark]
    var leagueName: String

    func club(id: UUID) -> Club? {
        clubs.first { $0.id == id }
    }

    var playableClub: Club? {
        club(id: playableClubID)
    }

    var nextOpponent: Club? {
        club(id: nextOpponentClubID)
    }

    var playableSquad: [Player] {
        players
            .filter { $0.clubID == playableClubID }
            .sorted { lhs, rhs in
                if lhs.isStarter != rhs.isStarter { return lhs.isStarter && !rhs.isStarter }
                if lhs.position != rhs.position {
                    return positionOrder(lhs.position) < positionOrder(rhs.position)
                }
                return lhs.ovr > rhs.ovr
            }
    }

    var rankedStandings: [Standing] {
        standings.sorted { lhs, rhs in
            if lhs.points != rhs.points { return lhs.points > rhs.points }
            if lhs.goalDifference != rhs.goalDifference {
                return lhs.goalDifference > rhs.goalDifference
            }
            return lhs.goalsFor > rhs.goalsFor
        }
    }

    private func positionOrder(_ position: Position) -> Int {
        switch position {
        case .gk: return 0
        case .df: return 1
        case .mf: return 2
        case .fw: return 3
        }
    }
}
