import SwiftUI

struct LigView: View {
    var body: some View {
        NavigationStack {
            PlaceholderTabScreen(title: "Lig")
                .navigationTitle("Lig")
        }
    }
}

#Preview {
    LigView()
}
