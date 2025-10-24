#!/bin/zsh
set -e

BASE_DIR=~/Downloads/UID_Serrano_v2.0.0_full
REPO_URL=https://github.com/Opsaic/UID_Serrano_v2.0.0_full.git
BRANCHES=("G-intelligence" "H-multitenant" "I-visual" "J-analytics" "K-automation")

echo "🌀 Starting UID Serrano v5.x Parallel Build Orchestration"
cd ~/Downloads

if [ -d "$BASE_DIR" ]; then
  echo "🔄 Refreshing existing repo..."
  cd $BASE_DIR && git fetch origin main && git reset --hard origin/main
else
  echo "⬇️  Cloning repo..."
  git clone $REPO_URL $BASE_DIR
  cd $BASE_DIR
fi

echo "🌱 Creating build branches..."
for t in ${BRANCHES[@]}; do
  git branch -D track-$t 2>/dev/null || true
  git checkout -b track-$t main
done

echo "🚀 Launching parallel builds..."
for t in ${BRANCHES[@]}; do
(
  cd $BASE_DIR
  git checkout track-$t
  echo "🧩 Building branch track-$t ..."
  rm -rf node_modules .next package-lock.json
  npm install --silent
  npm run build --silent
  echo "✅ Finished track-$t"
) &
done

wait
echo "💥 All parallel builds completed."

echo "🧹 Cleaning locks..."
rm -f $BASE_DIR/.git/index.lock || true

echo "🔗 Merging into dev-v5.1.0..."
git checkout -B dev-v5.1.0 main
for t in ${BRANCHES[@]}; do
  git merge --no-ff track-$t -m "Auto merge $t into dev-v5.1.0" || true
done

TAG=v5.5.0-pre$(date +%m%d%H%M)
git tag -a "$TAG" -m "Automated v5.1–v5.5 parallel build"
git push origin --all
git push origin --tags

echo "✅ Serrano v5.x parallel build orchestration complete."
echo "Tag created: $TAG"
echo "Merged branch: dev-v5.1.0"
