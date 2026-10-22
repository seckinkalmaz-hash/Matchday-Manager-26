import Foundation

struct Club: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var shortName: String
    var isPlayable: Bool

    init(
        id: UUID = UUID(),
        name: String,
        shortName: String,
        isPlayable: Bool = false
    ) {
        self.id = id
        self.name = name
        self.shortName = shortName
        self.isPlayable = isPlayable
    }
}
