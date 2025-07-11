#!/bin/bash

# Define variables
COMMIT_MESSAGE=${1:-"Auto-commit: $(date)"}
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if inside a git repo
if [ ! -d .git ]; then
  echo "❌ Not inside a Git repository."
  exit 1
fi

# Stage all changes
git add .

# Commit with message
git commit -m "$COMMIT_MESSAGE"

# Push to the current branch
git push origin "$BRANCH"
