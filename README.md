# Matchday Manager 26

Mobile-first football manager sim. Turkish UI: **Merkez**, **Kadro**, **Taktik**, **Transfer**, **Lig**, **Maça Çık**.

## Tracks

| Track | Location | Status |
|---|---|---|
| **Web PWA (primary)** | [`web/`](./web/) | Playable MVP loop — React + Vite + TypeScript |
| iOS SwiftUI (reference) | `MatchdayManager26/` on branch `cursor/phase-0-scaffold-a20b` | Phase 0–1 scaffold; App Store later when Mac available |

## Run (web)

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173` (or the LAN URL for phone testing). PWA manifest + viewport-fit are included.

## Product notes

- Synthetic **Endolu Ligi** / **Pogaz SK** seed — fictional names only
- Web-first locked for shipping without a Mac; native App Store remains a later path
