# Matchday Manager 26

Native iOS football manager sim (Swift + SwiftUI). Turkish UI labels: **Merkez**, **Kadro**, **Taktik**, **Transfer**, **Lig**, **Maça Çık**.

## Requirements

- macOS with **Xcode 15+**
- iOS **17+** deployment target
- iPhone simulator or device (iPhone-only; portrait-first)

## Open in Xcode

1. Clone this repo (branch `cursor/phase-0-scaffold-a20b` until merged).
2. Open `MatchdayManager26.xcodeproj` in Xcode (double-click or File → Open).
3. Select an iPhone simulator (e.g. iPhone 15) or your device.
4. Press Run (⌘R).

If signing fails on a physical device, set your **Team** under the MatchdayManager26 target → Signing & Capabilities.

## Current status (Phase 1)

- **Merkez**: playable club (Boğaz Spor), next opponent, recent form (G/B/M), transfer budget, **Maça Çık** visible but disabled (Phase 3).
- **Lig**: Anadolu Ligi table with W / D / L / GD / Pts (seed data).
- Synthetic seed only — not a licensed / live football database.
- **Kadro**, **Taktik**, **Transfer** still placeholders (Phase 2–3).

App Store / TestFlight upload comes later (Apple Developer account on a Mac).
