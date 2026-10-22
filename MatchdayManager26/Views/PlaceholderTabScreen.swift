import SwiftUI

/// Shared empty shell for Phase 0 tab placeholders.
struct PlaceholderTabScreen: View {
    let title: String

    var body: some View {
        VStack(spacing: 12) {
            Text(title)
                .font(.largeTitle.bold())
            Text("Yakında")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
    }
}

#Preview {
    PlaceholderTabScreen(title: "Merkez")
}
