#!/bin/bash

# Frontend Production Build Script
# This prepares the frontend for production deployment

set -e

echo "🏗️  Building Healing Herbs Frontend for Production"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Check .env for production
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production not found!"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not created."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo "📁 Production build created in: dist/"
echo ""
echo "Next steps:"
echo "1. Test the build: npm run preview"
echo "2. Deploy dist/ folder to your web server"
echo "3. Configure web server to serve index.html for SPA routing"
echo "4. Enable gzip compression on web server"
echo "5. Set cache headers for static assets"

