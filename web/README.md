# Matchday Manager 26 — Web PWA

Mobile-first React + Vite + TypeScript PWA. Turkish UI: **Merkez**, **Kadro**, **Taktik**, **Transfer**, **Lig**, **Maça Çık**.

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
- Seed: **Pogaz SK** + **Endolu Ligi** (fictional names)
- **Merkez**: next opponent, form, budget, **Maça Çık** basic sim
- **Kadro**: swap starters ↔ bench (XI = 11)
- **Taktik**: pitch + **4-3-3** / **3-5-2**
- **Transfer**: buy stars + free agents within budget
- **Lig**: W/D/L/GD/Pts updates after matches
