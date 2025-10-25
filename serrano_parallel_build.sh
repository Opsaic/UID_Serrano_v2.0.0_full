#!/bin/bash
# Serrano v6.0.0 (Project Horizon) Parallel Build Orchestration Script
# Run from: ~/Downloads/UID_Serrano_v2.0.0_full
# Author: OPSAIC Dev Automation
# ----------------------------------------

set -e

echo "🔧 Starting Serrano v6.0.0 Parallel Build Setup..."

# --- 1️⃣  Repository Prep ------------------------------------------------------
echo "📦 Cleaning and fetching latest baseline..."
git fetch --all
git checkout main
git pull origin main

# --- 2️⃣  Create Parallel Dev Branches ----------------------------------------
echo "🌱 Creating development branches..."
for BRANCH in v6.0.0-dev v6.0.0-ai v6.0.0-analytics v6.0.0-workflow v6.0.0-provenance
do
  git branch -D $BRANCH 2>/dev/null || true
  git checkout -b $BRANCH
done

# --- 3️⃣  Supabase Forks -------------------------------------------------------
echo "🧩 Forking Supabase databases..."
supabase db dump --project uid_serrano_prod > serrano_prod_schema.sql
for DB in staging ai analytics workflow provenance
do
  supabase db push --project uid_serrano_${DB} < serrano_prod_schema.sql
done

# --- 4️⃣  Vercel Project Linking ----------------------------------------------
echo "🔗 Linking Vercel projects..."
declare -A projects=(
  ["v6.0.0-dev"]="serrano-dev"
  ["v6.0.0-ai"]="serrano-ai"
  ["v6.0.0-analytics"]="serrano-analytics"
  ["v6.0.0-workflow"]="serrano-workflow"
  ["v6.0.0-provenance"]="serrano-provenance"
)

for BRANCH in "${!projects[@]}"
do
  git checkout $BRANCH
  vercel link --project ${projects[$BRANCH]} --yes || true
done

# --- 5️⃣  Parallel Builds ------------------------------------------------------
build_branch () {
  local branch=$1
  echo "⚙️  Building branch: $branch"
  git checkout $branch
  pnpm install
  pnpm build
  vercel build --prod --yes
  vercel deploy --prebuilt --yes --prod --force
}

export -f build_branch
echo "🚀 Starting parallel builds..."
parallel -j 4 build_branch ::: v6.0.0-ai v6.0.0-analytics v6.0.0-workflow v6.0.0-provenance

# --- 6️⃣  Merge All Branches into Dev -----------------------------------------
echo "🧬 Merging branches into unified dev branch..."
git checkout v6.0.0-dev
for BRANCH in v6.0.0-ai v6.0.0-analytics v6.0.0-workflow v6.0.0-provenance
do
  git merge $BRANCH --no-edit
done

# --- 7️⃣  Unified Build + Deployment ------------------------------------------
echo "🏗️  Building unified Serrano v6.0.0_full..."
pnpm install
pnpm build
vercel build --prod --yes
vercel deploy --prebuilt --prod --yes --force

# --- 8️⃣  Tag + Push -----------------------------------------------------------
echo "🏷️  Tagging release..."
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

