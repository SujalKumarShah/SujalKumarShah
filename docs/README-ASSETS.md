# README visuals and activity

The profile README follows the reference portfolio's charcoal background, white headings, gray ruler borders, compact chips and green accents. All artwork and statistics belong to Sujal Kumar Shah. The live profile-view counter is the only externally served image.

## Profile layout and view counter

The section order matches the reference: animated banner, introduction, profile views, technology chips, GitHub Analytics, learning focus, contact links, and closing line. Only verified Sujal profile links are included; no X or Codeforces account is invented. Development and regeneration instructions stay in this document rather than cluttering the profile README.

The view counter uses `hits.sh/github.com/SujalKumarShah`. It counts image requests since installation, not unique visitors or all-time GitHub views. GitHub caching affects its approximate total. It needs no token.

## Banner animation

The banner is displayed at **880 × 210** with a **2640 × 630** source per frame. A static PNG is selected for readers who prefer reduced motion. The generator sets `raw.pageHeight` on Sharp's input so each frame is encoded as a GIF page, rather than stacking every frame into one tall image. It verifies the output width, frame height and multiple pages before completing. A regression test also checks the GIF's logical canvas height.

The banner, badges, and technology chips are generated directly by `scripts/generate-readme-assets.mjs` using Sharp and React Icons:

```sh
node scripts/generate-readme-assets.mjs
```

React Icons includes Simple Icons under its respective icon license. The artwork composed around the icons is local to this project.

## Public activity snapshot

```sh
node scripts/update-readme-activity.mjs
```

For a visual edit, `node scripts/update-readme-activity.mjs --render-only` regenerates cards from the last verified `activity.json` without new network requests or changing its source timestamps. The scheduled workflow uses a full refresh.

This reads the site's verified `/api/github-activity` response. It requires both sources to succeed, validates the continuous 365-date calendar and descending repository totals, and rejects incomplete data before writing. Profile contributions of all types and active days cover the personal past-year calendar through today in Asia/Kolkata. Profile activity includes other repositories. Owned-repository commits count all contributors and bots in current public default-branch histories. The cards label these different scopes separately; historical GitHub contribution credit is not the same as current repository history.

`scripts/readme-visuals.mjs` renders a wide analytics panel with a green area chart and a separate compact language panel. The chart sums the actual daily contributions into calendar months within the returned 365-day range. Its first and last months may be partial. Straight segments connect the measured monthly totals; values are not smoothed or invented. SVG descriptions contain the date range and each monthly count. The language panel displays percentages calculated from combined source-line totals. Responsive `<picture>` sources use narrower, taller variants on screens up to 600 px so labels stay readable. All chart variants are sharp vector files generated from the same data. The refresh script updates those variants together and does not restore removed README sections or the old snapshot line.

### Source lines by language

`scripts/count-public-code.py` uses the official [cloc 2.10](https://github.com/AlDanial/cloc/tree/v2.10) program, downloaded from the release tag and checked against a pinned SHA-256 checksum. It reads only owned public repositories that are not forks. Each source tree is pinned to a commit SHA, and those SHAs and per-repository line totals are retained in `activity.json`.

The counter downloads recognized source files rather than entire repositories, so large videos and datasets are not fetched. It rejects truncated trees, unsafe paths and oversized source files. Repository source is read as text and is never executed. Blank lines, comments, generated output, minified files, dependency/build directories, and data/configuration formats are excluded. Notebook JSON is parsed into code cells; outputs and markdown cells are excluded, and source lines count toward the notebook's programming language. Counts describe current repository source, including collaborative work, rather than personal typing time or skill.

Each displayed percentage is that language's combined source lines divided by **all counted source lines across all included repositories**, multiplied by 100. Repository percentages are not averaged and byte sizes are not used. The six largest languages are listed; any remaining languages appear together as **Other languages**. Labels are rounded to one decimal place, so displayed percentages can total slightly above or below 100%. The bar uses unrounded shares. Raw per-language and per-repository line counts remain in `activity.json` for traceability; they are not displayed on the README card.

### Daily refresh and cost

The workflow in `.github/workflows/readme-activity.yml` is scheduled **once daily at 00:25 UTC (05:55 India time)**. There is no manual or push trigger. The job runs only in `SujalKumarShah/SujalKumarShah`, so contribution forks cannot write duplicate snapshots. Runs are serialized and have a ten-minute limit. GitHub may delay a scheduled job; this is not an exact delivery time. The `--daily` safeguard skips a retry when the calendar, repository counts and language snapshot have all refreshed on the current India date. A failed refresh does not mark that day complete. Earlier extra bot commits came from manual development checks; ordinary code commits are separate from this workflow. The live website refreshes activity independently in two-minute cache windows and does not need a Git commit to update.

It uses official checkout/runtime actions, the standard `ubuntu-latest` runner, Node.js 22, Python, system Perl, and the repository-scoped automatic GitHub token. Refresh scripts need only standard libraries, so the scheduled job does not install the website dependencies. Only the refresh job receives write access, and only README/assets changes are staged. No AI service is called and no paid runner is configured. Standard GitHub-hosted runners in public repositories are [currently free](https://docs.github.com/en/billing/concepts/product-billing/github-actions). Private repositories and larger runners have different billing rules. No artifacts or persistent Actions caches are uploaded by this workflow.

Updates commit as `github-actions[bot]` with the message `Refresh public GitHub activity`; these are automatic data changes. A run commits only when the generated snapshot changes, and it never force-pushes. There is no push trigger, so a data commit cannot start an update loop. Failed refreshes preserve the previous snapshot. GitHub can delay scheduled runs or disable schedules on inactive repositories.

The updater changes only the marked statistics section of the README and generated files in `assets/readme`. Cards use content hashes in local filenames to bypass GitHub's image caches; query versions were dropped by GitHub's image redirects during verification. Current and preceding linked card versions are retained for cached README pages. The high-resolution banner has its own `@3x` filename. Generated charts, banner images, and link badges are stored in this repository.

The generators emit only the chart filenames linked by the README and its responsive sources, plus the current and preceding snapshots. Unlinked chart aliases and the unused standalone header SVG have been removed; the banner source remains in `generate-readme-assets.mjs` for regeneration. Icon and font license files are retained with their assets.

## Search identity correction

The old `/official/opengraphh.jpg` contained the template author's name and artwork and was originally referenced by social metadata. The current metadata points to Sujal's own `/opengraph.png`. The legacy JPEG URL now also serves Sujal's preview, and the legacy placeholder logo is replaced by his local S mark. This prevents cached image URLs from continuing to return someone else's identity.

The visible design-credit link remains attributed to the original designer, with `data-nosnippet` on its text so Google can exclude it from result snippets. Google must recrawl the page and image before older result cards can update. Other search/AI providers may handle snippet controls differently.

## Profile-specific snapshots

The saved activity snapshot records `githubUsername`. The website rejects a fallback snapshot for a different account, and the README updater rejects repository links owned by another user. The updater reads its default endpoint from `public/profile.json`, so changing the deployment URL also updates the refresh source. The initial copied snapshot was replaced with Sujal's verified public data.

## Checks and local development

Use `npm ci` and `npm run dev` to run the website locally. Before contributing, run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`. Profile links and the deployment URL live in `public/profile.json`; project cards use `src/data/projects.json`. After editing either, run `npm run generate:agents` and `node scripts/generate-project-covers.mjs`.

A real README refresh requires the deployed `/api/github-activity` endpoint to return a complete, current India-date snapshot. Stale calendars, mismatched day ranges, partial responses, foreign repository owners and foreign language snapshots are rejected before any README or snapshot file is replaced. The previous successful snapshot remains intact on failure. Scheduled workflows begin on the default branch after merge, and GitHub may delay them; the schedule is 05:55 India time rather than an exact delivery guarantee.
