#!/usr/bin/env bash
# Export product/ as a standalone JobPilot repo (web app at root, mobile/
# subdir) and push it to your private repository.
#
# Usage:
#   ./scripts/export-standalone.sh git@github.com:anwarjkhan/jobpilot.git
set -euo pipefail

DEST_REMOTE="${1:?Usage: export-standalone.sh <git-remote-url>}"
SRC="$(cd "$(dirname "$0")/.." && pwd)" # product/
OUT="$(mktemp -d)/jobpilot"
mkdir -p "$OUT"

# Web app becomes the repo root (Vercel deploys it with zero config).
cp -r "$SRC/apps/web/." "$OUT/"
rm -rf "$OUT/node_modules" "$OUT/.next" "$OUT/tsconfig.tsbuildinfo" \
  "$OUT/package-lock.json"
cp -r "$SRC/apps/mobile" "$OUT/mobile"
cp "$SRC/README.md" "$OUT/README.md"
cp "$SRC/.gitignore" "$OUT/.gitignore"
cp "$SRC/vercel.json" "$OUT/vercel.json"

python3 - "$OUT" <<'PY'
import json, pathlib, re

out = pathlib.Path(__import__("sys").argv[1])

pkg_path = out / "package.json"
pkg = json.loads(pkg_path.read_text())
pkg["name"] = "jobpilot"
pkg_path.write_text(json.dumps(pkg, indent=2) + "\n")

# Exclude the mobile app from the web tsconfig (it has its own).
ts_path = out / "tsconfig.json"
ts = json.loads(ts_path.read_text())
ts["exclude"] = ["node_modules", "mobile"]
ts_path.write_text(json.dumps(ts, indent=2) + "\n")

(out / "mobile" / "tsconfig.json").write_text(json.dumps({
    "extends": "expo/tsconfig.base",
    "compilerOptions": {"strict": True},
    "include": ["**/*.ts", "**/*.tsx"],
}, indent=2) + "\n")

# Fix monorepo paths in the README for the flattened layout.
readme_path = out / "README.md"
readme = readme_path.read_text()
for old, new in [
    ("apps/web     Next.js 15 (App Router, TS) — UI + API + agents. Deploy on Vercel.",
     "/ (root)     Next.js 15 (App Router, TS) — UI + API + agents. Deploy on Vercel."),
    ("apps/mobile  Expo (React Native) skeleton",
     "mobile/      Expo (React Native) skeleton"),
    ("`apps/web/prisma/schema.prisma`", "`prisma/schema.prisma`"),
    ("cd apps/web", "# from the repo root"),
    ("cd apps/mobile", "cd mobile"),
    ("import `apps/web` as the project root",
     "import the repo (root is the Next.js app)"),
]:
    readme = readme.replace(old, new)
readme_path.write_text(readme)
PY

cd "$OUT"
git init -q -b main
git add -A
git -c commit.gpgsign=false commit -q \
  -m "JobPilot — autonomous job-search agent SaaS (initial import)"
git remote add origin "$DEST_REMOTE"
git push -u origin main
echo
echo "✅ Pushed standalone JobPilot to $DEST_REMOTE"
echo "Next: import it at https://vercel.com/new (see MIGRATION.md)"
