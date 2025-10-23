#!/bin/bash

# GitHub Pages Deployment Script
# Run this script from your portfolio directory

echo "🚀 Portfolio Deployment Script"
echo "==============================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Update portfolio"
    fi
    git commit -m "$commit_message"
    echo "✅ Changes committed"
fi

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "✅ Remote origin already configured"
else
    echo "🔗 Setting up remote repository..."
    read -p "Enter your GitHub username: " username
    read -p "Enter repository name (e.g., portfolio or $username.github.io): " repo_name
    
    git remote add origin "https://github.com/$username/$repo_name.git"
    echo "✅ Remote origin configured"
fi

# Set main branch
echo "🌿 Setting up main branch..."
git branch -M main

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Click 'Save'"
echo ""
echo "Your portfolio will be available at:"
echo "https://[your-username].github.io/[repository-name]"
echo ""
echo "⏱️  It may take a few minutes for the site to go live."