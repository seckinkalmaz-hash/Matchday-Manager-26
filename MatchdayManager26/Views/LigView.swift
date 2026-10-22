import SwiftUI

struct LigView: View {
    @Environment(GameStore.self) private var store

    private let metricWidth: CGFloat = 28
    private let gdWidth: CGFloat = 36

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
            .navigationBarTitleDisplayMode(.large)
        }
    }

    private var headerRow: some View {
        HStack(spacing: 0) {
            Text("#")
                .frame(width: metricWidth, alignment: .leading)
            Text("Kulüp")
            Spacer(minLength: 8)
            metricHeader("G")
            metricHeader("B")
            metricHeader("M")
            Text("Av")
                .frame(width: gdWidth, alignment: .trailing)
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
                .frame(width: metricWidth, alignment: .leading)

            Text(club?.name ?? "—")
                .font(isPlayable ? .subheadline.bold() : .subheadline)
                .lineLimit(1)
                .minimumScaleFactor(0.8)

            Spacer(minLength: 8)

            metricCell(standing.won)
            metricCell(standing.drawn)
            metricCell(standing.lost)
            Text(signed(standing.goalDifference))
                .font(.subheadline.monospacedDigit())
                .foregroundStyle(.secondary)
                .frame(width: gdWidth, alignment: .trailing)
            Text("\(standing.points)")
                .font(.subheadline.bold().monospacedDigit())
                .frame(width: metricWidth, alignment: .trailing)
        }
        .listRowInsets(EdgeInsets(top: 10, leading: 16, bottom: 10, trailing: 16))
        .listRowBackground(isPlayable ? Color.accentColor.opacity(0.12) : nil)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel(rank: rank, clubName: club?.name ?? "", standing: standing))
    }

    private func metricHeader(_ title: String) -> some View {
        Text(title)
            .frame(width: metricWidth, alignment: .trailing)
    }

    private func metricCell(_ value: Int) -> some View {
        Text("\(value)")
            .font(.subheadline.monospacedDigit())
            .foregroundStyle(.secondary)
            .frame(width: metricWidth, alignment: .trailing)
    }

    private func signed(_ value: Int) -> String {
        value > 0 ? "+\(value)" : "\(value)"
    }

    private func accessibilityLabel(rank: Int, clubName: String, standing: Standing) -> String {
        "\(rank). \(clubName), \(standing.won) galibiyet, \(standing.drawn) beraberlik, \(standing.lost) mağlubiyet, averaj \(standing.goalDifference), \(standing.points) puan"
    }
}

#Preview {
    LigView()
        .environment(GameStore())
}
