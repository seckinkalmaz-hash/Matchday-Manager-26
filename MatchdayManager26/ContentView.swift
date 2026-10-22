import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            MerkezView()
                .tabItem {
                    Label("Merkez", systemImage: "house.fill")
                }

            KadroView()
                .tabItem {
                    Label("Kadro", systemImage: "person.3.fill")
                }

            TaktikView()
                .tabItem {
                    Label("Taktik", systemImage: "sportscourt.fill")
                }

            TransferView()
                .tabItem {
                    Label("Transfer", systemImage: "arrow.left.arrow.right")
                }

            LigView()
                .tabItem {
                    Label("Lig", systemImage: "list.number")
                }
        }
    }
}

#Preview {
    ContentView()
        .environment(GameStore())
}
