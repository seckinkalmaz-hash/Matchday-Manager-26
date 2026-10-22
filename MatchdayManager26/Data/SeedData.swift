import Foundation

/// Synthetic Phase 1 seed — fictional clubs/players, not a licensed database.
enum SeedData {
    static func makeGameState() -> GameState {
        let playableID = UUID()
        let opponentIDs = (0..<7).map { _ in UUID() }

        let clubs: [Club] = [
            Club(id: playableID, name: "Boğaz Spor", shortName: "BGS", isPlayable: true),
            Club(id: opponentIDs[0], name: "Ankara Yıldızı", shortName: "ANK"),
            Club(id: opponentIDs[1], name: "İzmir Rüzgarı", shortName: "IZM"),
            Club(id: opponentIDs[2], name: "Karadeniz FK", shortName: "KRD"),
            Club(id: opponentIDs[3], name: "Ege Ateşi", shortName: "EGE"),
            Club(id: opponentIDs[4], name: "Trakya Birlik", shortName: "TRK"),
            Club(id: opponentIDs[5], name: "Akdeniz Gücü", shortName: "AKD"),
            Club(id: opponentIDs[6], name: "Anadolu Kartalı", shortName: "ANA"),
        ]

        let squad: [Player] = [
            Player(name: "Emre Kaya", position: .gk, ovr: 74, value: 4_500_000, clubID: playableID, isStarter: true),
            Player(name: "Can Demir", position: .df, ovr: 72, value: 3_800_000, clubID: playableID, isStarter: true),
            Player(name: "Berk Aydın", position: .df, ovr: 71, value: 3_200_000, clubID: playableID, isStarter: true),
            Player(name: "Yusuf Çelik", position: .df, ovr: 70, value: 2_900_000, clubID: playableID, isStarter: true),
            Player(name: "Mert Şahin", position: .df, ovr: 69, value: 2_400_000, clubID: playableID, isStarter: true),
            Player(name: "Ozan Yılmaz", position: .mf, ovr: 76, value: 6_500_000, clubID: playableID, isStarter: true),
            Player(name: "Burak Arslan", position: .mf, ovr: 73, value: 4_100_000, clubID: playableID, isStarter: true),
            Player(name: "Kerem Öz", position: .mf, ovr: 72, value: 3_700_000, clubID: playableID, isStarter: true),
            Player(name: "Ali Koç", position: .fw, ovr: 75, value: 5_800_000, clubID: playableID, isStarter: true),
            Player(name: "Hakan Polat", position: .fw, ovr: 74, value: 5_200_000, clubID: playableID, isStarter: true),
            Player(name: "Deniz Aksoy", position: .fw, ovr: 71, value: 3_500_000, clubID: playableID, isStarter: true),
            Player(name: "Serkan Güneş", position: .gk, ovr: 68, value: 1_800_000, clubID: playableID, isStarter: false),
            Player(name: "Tolga Er", position: .df, ovr: 66, value: 1_200_000, clubID: playableID, isStarter: false),
            Player(name: "Onur Baş", position: .mf, ovr: 67, value: 1_500_000, clubID: playableID, isStarter: false),
            Player(name: "Efe Kurt", position: .fw, ovr: 65, value: 900_000, clubID: playableID, isStarter: false),
        ]

        // Mid-season-ish seed table (8 clubs). Playable sits mid-table.
        let standingSeeds: [(UUID, Int, Int, Int, Int, Int)] = [
            // clubID, W, D, L, GF, GA
            (opponentIDs[0], 7, 2, 1, 18, 8),
            (opponentIDs[1], 6, 3, 1, 16, 9),
            (opponentIDs[6], 5, 3, 2, 14, 10),
            (playableID, 4, 3, 3, 13, 12),
            (opponentIDs[2], 4, 2, 4, 12, 13),
            (opponentIDs[3], 3, 3, 4, 11, 14),
            (opponentIDs[4], 2, 2, 6, 9, 16),
            (opponentIDs[5], 1, 2, 7, 7, 18),
        ]

        let standings: [Standing] = standingSeeds.map { seed in
            let (clubID, won, drawn, lost, gf, ga) = seed
            return Standing(
                clubID: clubID,
                played: won + drawn + lost,
                won: won,
                drawn: drawn,
                lost: lost,
                goalsFor: gf,
                goalsAgainst: ga
            )
        }

        return GameState(
            clubs: clubs,
            players: squad,
            standings: standings,
            transferBudget: 12_500_000,
            playableClubID: playableID,
            nextOpponentClubID: opponentIDs[2], // Karadeniz FK
            recentForm: [.win, .win, .draw, .loss, .win],
            leagueName: "Anadolu Ligi"
        )
    }
}
