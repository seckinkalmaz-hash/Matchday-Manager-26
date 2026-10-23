# Matchday Manager 26

Mobile-first football manager sim. Turkish UI: **Merkez**, **Kadro**, **Taktik**, **Transfer**, **Lig**, **Maça Çık**.

> **Kişisel kullanım — lisanslı dağıtım yok.**  
> Real club/player names in the web seed are for private personal use only — not for App Store, public marketing, or commercial distribution. No EA/FIFA affiliation.

## Tracks

| Track | Location | Status |
|---|---|---|
| **Web PWA (primary)** | [`web/`](./web/) | Playable MVP — React + Vite + TypeScript |
| iOS SwiftUI (reference) | `MatchdayManager26/` on branch `cursor/phase-0-scaffold-a20b` | Phase 0–1 scaffold; App Store later when Mac available |

## Run (web)

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173` (or the LAN URL for phone testing). PWA manifest + viewport-fit are included.

## Product notes

- Playable club: **Galatasaray** · league label: **Süper Lig** (8-club personal-use seed)
- Web-first locked for local play without a Mac; App Store packaging is out of scope for this seed
