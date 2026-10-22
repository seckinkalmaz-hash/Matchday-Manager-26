import Foundation

struct Player: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var position: Position
    var ovr: Int
    var value: Int
    var clubID: UUID
    var isStarter: Bool

    init(
        id: UUID = UUID(),
        name: String,
        position: Position,
        ovr: Int,
        value: Int,
        clubID: UUID,
        isStarter: Bool = false
    ) {
        self.id = id
        self.name = name
        self.position = position
        self.ovr = ovr
        self.value = value
        self.clubID = clubID
        self.isStarter = isStarter
    }
}
