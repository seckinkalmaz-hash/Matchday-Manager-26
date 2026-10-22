import SwiftUI

struct LigView: View {
    @Environment(GameStore.self) private var store

    var body: some View {
        NavigationStack {
            List {
                Section {
                    headerRow
                    ForEach(Array(store.state.rankedStandings.enumerated()), id: \.element.id) { index, standing in
                        standingRow(rank: index + 1, standing: standing)
                    }
                } header: {
                    Text(store.state.leagueName)
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Lig")
        }
    }

    private var headerRow: some View {
        HStack(spacing: 0) {
            Text("#")
                .frame(width: 28, alignment: .leading)
            Text("Kulüp")
            Spacer()
            metricHeader("G")
            metricHeader("B")
            metricHeader("M")
            metricHeader("Av")
            metricHeader("P")
        }
        .font(.caption.weight(.semibold))
        .foregroundStyle(.secondary)
        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 4, trailing: 16))
        .listRowSeparator(.hidden)
        .accessibilityHidden(true)
    }

    private func standingRow(rank: Int, standing: Standing) -> some View {
        let club = store.state.club(id: standing.clubID)
        let isPlayable = standing.clubID == store.state.playableClubID

        return HStack(spacing: 0) {
            Text("\(rank)")
                .font(.subheadline.monospacedDigit())
                .foregroundStyle(.secondary)
                .frame(width: 28, alignment: .leading)

            Text(club?.name ?? "—")
                .font(isPlayable ? .subheadline.bold() : .subheadline)
                .lineLimit(1)

            Spacer(minLength: 8)

            metricCell(standing.won)
            metricCell(standing.drawn)
            metricCell(standing.lost)
            metricCell(standing.goalDifference, signed: true)
            Text("\(standing.points)")
                .font(.subheadline.bold().monospacedDigit())
                .frame(width: 28, alignment: .trailing)
        }
        .listRowBackground(isPlayable ? Color.accentColor.opacity(0.12) : nil)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel(rank: rank, clubName: club?.name ?? "", standing: standing))
    }

    private func metricHeader(_ title: String) -> some View {
        Text(title)
            .frame(width: 28, alignment: .trailing)
    }

    private func metricCell(_ value: Int, signed: Bool = false) -> some View {
        Text(signed && value > 0 ? "+\(value)" : "\(value)")
            .font(.subheadline.monospacedDigit())
            .foregroundStyle(.secondary)
            .frame(width: 28, alignment: .trailing)
    }

    private func accessibilityLabel(rank: Int, clubName: String, standing: Standing) -> String {
        "\(rank). \(clubName), \(standing.won) galibiyet, \(standing.drawn) beraberlik, \(standing.lost) mağlubiyet, averaj \(standing.goalDifference), \(standing.points) puan"
    }
}

#Preview {
    LigView()
        .environment(GameStore())
}
