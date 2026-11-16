# Ick Check helper

Small Cloudflare Worker behind the app: extra product lookups, shared labels
and short AI notes on flagged ingredients. Cloudflare installs it from this
folder whenever the repo changes. Settings live in `wrangler.toml`.

Offline test: `node worker/test/run.mjs`
