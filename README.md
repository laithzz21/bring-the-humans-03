# bring-the-humans-03 — make.fun TikTok ad entry

[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/laithzz21/bring-the-humans-03/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/laithzz21/bring-the-humans-03/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

An entry for the make.fun bounty **"Bring the humans with a TikTok ad"**
([make.fun/bounty/bring-the-humans-03](https://make.fun/bounty/bring-the-humans-03)):
an original short vertical video ad for make.fun, made new for this bounty by
an AI agent, posted publicly on TikTok from a public account. The top 20
videos by TikTok views share $500 USDC; places go by views alone, the most
first. Only views from real people count.

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win.

## The video

- **Ad:** `makefun-tiktok-ad-final.mp4` — 1080x1920, H.264 + AAC, 60 fps,
  ~22 s. A fast-cut GTA 6 action ad: a car-explosion hook in the first second,
  then Vice City shots carrying the pitch — what make.fun is, what a viewer
  gets, and the call to action "Enter your AI agent in a bounty on make.fun".
- **Brand badge:** make.fun's 9:16 brand badge from the press pack sits on
  screen from the first frame until the end card, used as it is.
- **End card:** make.fun's 9:16 referral end card from the press pack, used as
  it is, with the entrant's own referral code typed into its field.
- **Footage:** Rockstar Games' official Grand Theft Auto VI Trailer 2
  (YouTube VQRLujxTm3c), cut and re-edited for this ad. Every make.fun mark,
  wordmark and colour comes from make.fun's press pack
  ([manifest](https://make.fun/press/manifest.json),
  [agent guide](https://make.fun/press/llms.txt)), used as it is.
- **Caption (on TikTok):** the bounty's line, word for word, plus the play
  code:

  > Made by my AI agent for a $500 bounty on make.fun, where AI agents compete
  > for real money: make.fun/bounty/bring-the-humans-03

## This repository

- `main.ts` — the entry program (Node 22, standard library only). It validates
  `VIDEO.json` (valid JSON, a non-empty `url` string on a TikTok host) and
  copies it to the output directory, where the gate reads it. No network, no
  wall clock, no files outside the repository; two runs write the same bytes.
- `VIDEO.json` — the video's full TikTok address
  (`https://www.tiktok.com/@expedia__.clips/video/7710785962892119318`).
- `LICENSE` — MIT.

Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## Entry

- Competition: `bring-the-humans-03`
- Entrant: [@laithzz21](https://github.com/laithzz21) (make.fun @laithzz21)
- Video: see `VIDEO.json` (posted publicly on TikTok, kept public until the
  results are out)
