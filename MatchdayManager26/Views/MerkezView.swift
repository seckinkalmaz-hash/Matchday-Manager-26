import SwiftUI

struct MerkezView: View {
    @Environment(GameStore.self) private var store

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    clubHeader
                    nextOpponentCard
                    formSection
                    budgetSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 8)
                .padding(.bottom, 24)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Merkez")
            .navigationBarTitleDisplayMode(.large)
            .safeAreaInset(edge: .bottom, spacing: 0) {
                macaCikBar
            }
        }
    }

    private var clubHeader: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(store.state.playableClub?.name ?? "Kulüp")
                .font(.title2.bold())
            Text(store.state.leagueName)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityElement(children: .combine)
    }

    private var nextOpponentCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Sıradaki Maç")
                .font(.caption)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)

            HStack(spacing: 12) {
                clubBadge(store.state.playableClub?.shortName ?? "—")

                Text("vs")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.secondary)

                clubBadge(store.state.nextOpponent?.shortName ?? "—")

                VStack(alignment: .leading, spacing: 2) {
                    Text(store.state.nextOpponent?.name ?? "Rakip yok")
                        .font(.headline)
                        .lineLimit(2)
                        .minimumScaleFactor(0.85)
                    Text("Deplasman")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Spacer(minLength: 0)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
        .accessibilityElement(children: .combine)
        .accessibilityLabel(
            "Sıradaki maç, \(store.state.nextOpponent?.name ?? "rakip yok"), deplasman"
        )
    }

    private var formSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Son Form")
                .font(.caption)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)

            HStack(spacing: 8) {
                ForEach(Array(store.state.recentForm.enumerated()), id: \.offset) { _, mark in
                    Text(mark.rawValue)
                        .font(.subheadline.bold())
                        .foregroundStyle(.white)
                        .frame(width: 32, height: 32)
                        .background(formColor(mark), in: RoundedRectangle(cornerRadius: 6))
                        .accessibilityLabel(mark.label)
                }
                Spacer(minLength: 0)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
    }

    private var budgetSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Transfer Bütçesi")
                .font(.caption)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)

            Text(store.transferBudgetText)
                .font(.title.bold())
                .monospacedDigit()
                .minimumScaleFactor(0.8)
                .lineLimit(1)
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Transfer bütçesi \(store.transferBudgetText)")
    }

    private var macaCikBar: some View {
        Button(action: {}) {
            Text("Maça Çık")
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
        }
        .buttonStyle(.borderedProminent)
        .disabled(true)
        .padding(.horizontal, 16)
        .padding(.top, 8)
        .padding(.bottom, 8)
        .background(.bar)
        .accessibilityHint("Maç simülasyonu Phase 3'te açılacak")
    }

    private func clubBadge(_ shortName: String) -> some View {
        Text(shortName)
            .font(.headline)
            .minimumScaleFactor(0.7)
            .lineLimit(1)
            .frame(width: 48, height: 48)
            .background(Color(.secondarySystemFill), in: Circle())
            .accessibilityHidden(true)
    }

    private func formColor(_ mark: MatchResultMark) -> Color {
        switch mark {
        case .win: return .green
        case .draw: return .orange
        case .loss: return .red
        }
    }
}

#Preview {
    MerkezView()
        .environment(GameStore())
}
