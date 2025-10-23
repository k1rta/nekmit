#!/bin/bash

# Local Testing Script - Run all CI checks locally before pushing
# This script mimics what the CI/CD pipeline does

set -e  # Exit on any error

echo "🚀 Starting local CI/CD checks..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1 passed${NC}"
    else
        echo -e "${RED}❌ $1 failed${NC}"
        exit 1
    fi
}

# 1. Linting
echo "📝 Running ESLint..."
npm run lint
print_status "ESLint"
echo ""

# 2. Formatting check
echo "🎨 Checking Prettier formatting..."
npm run format:check
print_status "Prettier formatting"
echo ""

# 3. Build
echo "🔨 Building application..."
npm run build
print_status "Build"
echo ""

# 4. Run tests (optional - can be slow)
read -p "Run full E2E tests? This may take 2-3 minutes. (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧪 Running E2E tests..."
    npm run test:e2e:report
    print_status "E2E tests"
    echo ""
    echo "📊 Test report generated at: playwright-report/index.html"
    echo "   View it with: open playwright-report/index.html"
else
    echo -e "${YELLOW}⏭️  Skipping E2E tests${NC}"
fi

echo ""
echo -e "${GREEN}🎉 All checks passed! Ready to push.${NC}"
echo ""
echo "Next steps:"
echo "  1. git add ."
echo "  2. git commit -m \"your message\""
echo "  3. git push"
