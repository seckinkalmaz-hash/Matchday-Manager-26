import SwiftUI

struct TaktikView: View {
    var body: some View {
        NavigationStack {
            PlaceholderTabScreen(title: "Taktik")
                .navigationTitle("Taktik")
        }
    }
}

#Preview {
    TaktikView()
}
