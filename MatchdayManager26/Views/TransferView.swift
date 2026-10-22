import SwiftUI

struct TransferView: View {
    var body: some View {
        NavigationStack {
            PlaceholderTabScreen(title: "Transfer")
                .navigationTitle("Transfer")
        }
    }
}

#Preview {
    TransferView()
}
