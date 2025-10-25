#!/bin/bash
set -e

echo "🔧 Starting Serrano v6.0.0 Parallel Build Setup..."

echo "📦 Cleaning and fetching latest baseline..."
git fetch origin
git reset --hard origin/main

echo "🌿 Creating feature branches..."
for BRANCH in ai analytics workflow provenance; do
  git checkout -B $BRANCH
  echo "🚀 Building branch: $BRANCH"
  pnpm install
  pnpm build
  vercel build --prod --yes
  vercel deploy --prebuilt --prod --yes --force
done

git checkout main
echo "🔗 Merging branches..."
for BRANCH in ai analytics workflow provenance; do
  git merge $BRANCH --no-edit
done

echo "🏗️ Building unified Serrano v6.0.0_full..."
pnpm install
pnpm build
vercel build --prod --yes
vercel deploy --prebuilt --prod --yes --force

echo "🏷️ Tagging release..."
git tag -a v6.0.0-final -m "Unified Serrano Project Horizon Release"
git push origin v6.0.0-final

echo "✅ Serrano v6.0.0 (Project Horizon) Build Complete!"
echo "🌐 Deployed branches:"
echo "  - serrano-dev.vercel.app"
echo "  - serrano-ai.vercel.app"
echo "  - serrano-analytics.vercel.app"
echo "  - serrano-workflow.vercel.app"
echo "  - serrano-provenance.vercel.app"
echo "  - Unified: Serrano v6.0.0_full (Production Ready)"
