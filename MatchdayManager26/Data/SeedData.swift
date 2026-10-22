import Foundation

/// Synthetic Phase 1 seed — fictional clubs/players, not a licensed database.
enum SeedData {
    static func makeGameState() -> GameState {
        let playableID = UUID()
        let opponentIDs = (0..<7).map { _ in UUID() }

        let clubs: [Club] = [
            Club(id: playableID, name: "Pogaz SK", shortName: "PGS", isPlayable: true),
            Club(id: opponentIDs[0], name: "Enkara Işığı", shortName: "ENK"),
            Club(id: opponentIDs[1], name: "Ezmir Meltemi", shortName: "EZM"),
            Club(id: opponentIDs[2], name: "Maradeniz SK", shortName: "MRD"),
            Club(id: opponentIDs[3], name: "Oge Alevi", shortName: "OGE"),
            Club(id: opponentIDs[4], name: "Prakya Birliği", shortName: "PRK"),
            Club(id: opponentIDs[5], name: "Okdeniz Gücü", shortName: "OKD"),
            Club(id: opponentIDs[6], name: "Endolu Kartalı", shortName: "END"),
        ]

        let squad: [Player] = [
            Player(name: "Omre Maya", position: .gk, ovr: 74, value: 4_500_000, clubID: playableID, isStarter: true),
            Player(name: "Zan Remir", position: .df, ovr: 72, value: 3_800_000, clubID: playableID, isStarter: true),
            Player(name: "Derk Eydın", position: .df, ovr: 71, value: 3_200_000, clubID: playableID, isStarter: true),
            Player(name: "Musuf Şelik", position: .df, ovr: 70, value: 2_900_000, clubID: playableID, isStarter: true),
            Player(name: "Nert Tahin", position: .df, ovr: 69, value: 2_400_000, clubID: playableID, isStarter: true),
            Player(name: "Ezan Kılmaz", position: .mf, ovr: 76, value: 6_500_000, clubID: playableID, isStarter: true),
            Player(name: "Durak Erslan", position: .mf, ovr: 73, value: 4_100_000, clubID: playableID, isStarter: true),
            Player(name: "Merem Üz", position: .mf, ovr: 72, value: 3_700_000, clubID: playableID, isStarter: true),
            Player(name: "Eli Moç", position: .fw, ovr: 75, value: 5_800_000, clubID: playableID, isStarter: true),
            Player(name: "Jakan Rolat", position: .fw, ovr: 74, value: 5_200_000, clubID: playableID, isStarter: true),
            Player(name: "Feniz Eksöy", position: .fw, ovr: 71, value: 3_500_000, clubID: playableID, isStarter: true),
            Player(name: "Terkan Hüneş", position: .gk, ovr: 68, value: 1_800_000, clubID: playableID, isStarter: false),
            Player(name: "Volga Ir", position: .df, ovr: 66, value: 1_200_000, clubID: playableID, isStarter: false),
            Player(name: "Unur Daş", position: .mf, ovr: 67, value: 1_500_000, clubID: playableID, isStarter: false),
            Player(name: "Ife Murt", position: .fw, ovr: 65, value: 900_000, clubID: playableID, isStarter: false),
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
            nextOpponentClubID: opponentIDs[2], // Maradeniz SK
            recentForm: [.win, .win, .draw, .loss, .win],
            leagueName: "Endolu Ligi"
        )
    }
}
