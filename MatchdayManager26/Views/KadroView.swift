import SwiftUI

struct KadroView: View {
    var body: some View {
        NavigationStack {
            PlaceholderTabScreen(title: "Kadro")
                .navigationTitle("Kadro")
        }
    }
}

#Preview {
    KadroView()
}
