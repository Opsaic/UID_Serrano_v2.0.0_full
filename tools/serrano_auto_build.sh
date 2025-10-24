#!/bin/zsh
set -e

BASE_DIR=~/Downloads/UID_Serrano_v2.0.0_full
REPO_URL=https://github.com/Opsaic/UID_Serrano_v2.0.0_full.git
BRANCHES=("A-security" "B-3d-ar" "C-reports" "D-analytics" "E-testing" "F-marketplace")

echo "🌀 Starting UID Serrano Parallel Build Orchestration"
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
    rm -rf node_modules .next .turbo package-lock.json
    npm install --silent
    npm run build --silent
    echo "✅ Finished track-$t"
  ) &
done

wait
echo "💥 All parallel builds completed."

echo "🧹 Cleaning possible locks..."
rm -f $BASE_DIR/.git/index.lock || true

echo "🔗 Merging branches into dev-main..."
git checkout -B dev-main main
for t in ${BRANCHES[@]}; do
  git merge --no-ff track-$t -m "Auto merge $t into dev-main" || true
done

TAG=v5.0.0-pre$(date +%m%d%H%M)
git tag -a "$TAG" -m "Automated parallel pre-release build"

echo "📤 Pushing all branches and tags..."
git push origin --all
git push origin --tags

echo "✅ Parallel build orchestration complete."
echo "Tag created: $TAG"
echo "Merged branch: dev-main"
