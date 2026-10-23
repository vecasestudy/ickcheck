# Ick Check™

Ick Check is a mobile web app for checking the ingredients in beauty and personal care products. You can scan a label or paste an ingredient list, see which ingredients are flagged and by which named source, and share a routine scorecard.

**Status:** early MVP. Flags are not safety verdicts or medical advice.

## How it works

- **Scan:** the phone camera reads the product barcode in the browser (no app download). A photo of the barcode or the typed number also works.
- **Look up:** the barcode is looked up in [Open Beauty Facts](https://world.openbeautyfacts.org), an open, community-built database of cosmetics.
- **Flag:** each ingredient is checked against the EU endocrine disruptor lists ([edlists.org](https://edlists.org)), and every flag names the list it comes from (List I, II or III). The list used is in `app/data/flags.js`.
- **Read a label:** if a product isn't in the database, a photo of the ingredient list is read on the phone itself (open-source text recognition); the photo is not uploaded.

## Data sources

- Product data: Open Beauty Facts, available under the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1-0/). Product data is fetched live and credited in the app.
- Flag list: EU endocrine disruptor lists, edlists.org (checked October 2026; site update 2026/04).

- Landing page: `index.html`
- App: `app/`
- Live site: https://ickcheck.ai (once the domain is connected)

## Third-party code

Bundled open-source libraries and their licenses are listed in `app/vendor/README.md`.

## Copyright

© 2026 V. Herman. All rights reserved.

This repository is public so the site can be hosted, but no license is granted. You may view the code. You may not copy, modify, distribute, or use it, or the Ick Check name, design, or content, without written permission.

"Ick Check" and the Ick Check logo are trademarks of V. Herman.
