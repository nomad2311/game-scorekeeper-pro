# Bank & Score!

The ultimate companion app for Farkle, Yahtzee, Dominoes, Spades, and Euchre — featuring instant score banking, automatic calculations, saved matches, Android TV D-Pad remote support, and detailed player stats.

Live site: https://bankandscore.vercel.app

## Games

- Farkle — plays to 10,000 points, with dynamic roll builders and automated combination scoring
- Yahtzee — interactive 13-category scorecard with subtotal markers, bonus triggers, and extra-Yahtzee credits
- Dominoes — fast log lists with quick adder pads
- Spades — bids, Nil & Blind Nil, overtrick bags, and 10-bag penalties; 2v2 Partnership or Cutthroat
- Euchre — Trump & Bower tracker, Going Alone sweeps, Euchre penalties, and 3-player Cutthroat mode

## Run locally

Prerequisites: Node.js

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

Voice commands use a Gemini API key when `GEMINI_API_KEY` is set; without it the app falls back to its built-in local voice rules.

## Deploy

Deployed on Vercel as project BankandScore. Build command: `vite build`. Output directory: `dist`.

## Tech

React 19, Vite, TypeScript, Tailwind CSS, Firebase (Auth + Firestore).
