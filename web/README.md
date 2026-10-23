# Matchday Manager 26 — Web PWA

Mobile-first React + Vite + TypeScript PWA. Turkish UI: **Merkez**, **Kadro**, **Taktik**, **Transfer**, **Lig**, **Maça Çık**.

> **Kişisel kullanım — lisanslı dağıtım yok.**  
> Club/player names are a private Süper Lig–style seed for personal play only. Not licensed for App Store, public marketing, or commercial distribution. Not affiliated with EA, FIFA, or any club/league.

iOS SwiftUI project (if present on another branch) stays separate — this app lives under `web/` only.

## Run

```bash
cd web
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`). On a phone, use the LAN URL Vite prints, or add to home screen (PWA).

```bash
npm run build
npm run preview
```

## What’s in MVP

- Five-tab shell with safe-area / full-screen phone frame
- Seed: playable **Galatasaray** in **Süper Lig** (personal-use real names)
- League: Galatasaray, Fenerbahçe, Beşiktaş, Trabzonspor, Başakşehir, Antalyaspor, Konyaspor, Sivasspor
- **Merkez**: next opponent, form, budget, **Maça Çık** basic sim
- **Kadro**: swap starters ↔ bench (XI = 11)
- **Taktik**: pitch + **4-3-3** / **3-5-2**
- **Transfer**: buy stars + free agents within budget
- **Lig**: W/D/L/GD/Pts updates after matches
