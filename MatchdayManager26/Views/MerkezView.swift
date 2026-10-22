import SwiftUI

struct MerkezView: View {
    @Environment(GameStore.self) private var store

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    clubHeader
                    nextOpponentCard
                    formSection
                    budgetSection
                    macaCikButton
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Merkez")
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
    }

    private var nextOpponentCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Sıradaki Maç")
                .font(.caption)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)

            HStack(spacing: 12) {
                Text(store.state.playableClub?.shortName ?? "—")
                    .font(.headline)
                    .frame(width: 48, height: 48)
                    .background(Color(.secondarySystemFill), in: Circle())

                Text("vs")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.secondary)

                Text(store.state.nextOpponent?.shortName ?? "—")
                    .font(.headline)
                    .frame(width: 48, height: 48)
                    .background(Color(.secondarySystemFill), in: Circle())

                VStack(alignment: .leading, spacing: 2) {
                    Text(store.state.nextOpponent?.name ?? "Rakip yok")
                        .font(.headline)
                    Text("Deplasman")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Spacer(minLength: 0)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
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
        .padding()
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
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
    }

    private var macaCikButton: some View {
        Button(action: {}) {
            Text("Maça Çık")
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
        }
        .buttonStyle(.borderedProminent)
        .disabled(true)
        .accessibilityHint("Maç simülasyonu Phase 3'te açılacak")
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
