import SwiftUI

struct MerkezView: View {
    var body: some View {
        NavigationStack {
            PlaceholderTabScreen(title: "Merkez")
                .navigationTitle("Merkez")
        }
    }
}

#Preview {
    MerkezView()
}
