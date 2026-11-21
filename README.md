# paperless-landing

Landing page, Terms of Use, and Privacy Policy for **Paperless Companion** (`com.paperlesscompanion.app`, App Store ID `6836218613`), hosted at [https://paperless.milliways.si](https://paperless.milliways.si).

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- App Store screenshots generated with `goldie` + `argent` (`.argent/flows/`, `goldie.config.ts`)
- Deployed to Cloudflare Workers with static assets via `cf` (`cloudflare.config.ts`)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare

Requires `cf` CLI logged in with access to account `653f507ee5697b23ccd9afb9a000b267` and zone `milliways.si` (`8a6055ebc3ceefad42961a9de2683a75`).

```bash
npm run build
CLOUDFLARE_ACCOUNT_ID=653f507ee5697b23ccd9afb9a000b267 CLOUDFLARE_ZONE_ID=8a6055ebc3ceefad42961a9de2683a75 cf deploy dist
```

## Regenerating App Store Screenshots

```bash
goldie doctor
goldie capture
goldie frame
cp out/screenshots/6.9/en-US/*.png public/screenshots/
```
