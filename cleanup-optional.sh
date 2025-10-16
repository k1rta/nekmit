#!/bin/bash

# Cleanup script for optional files
# Run this if you want to remove temporary documentation

echo "🧹 Cleaning up optional files..."

# Remove temporary status file
if [ -f "PROJECT_STATUS.md" ]; then
    rm PROJECT_STATUS.md
    echo "✅ Removed PROJECT_STATUS.md"
fi

# Remove example test (optional - uncomment if you want to remove it)
# if [ -f "src/utils/helpers.test.js" ]; then
#     rm src/utils/helpers.test.js
#     rmdir src/utils 2>/dev/null
#     echo "✅ Removed example test"
# fi

echo "✨ Cleanup complete!"
echo ""
echo "Files kept:"
echo "  ✅ CONTRIBUTING.md - Contribution guidelines"
echo "  ✅ SETUP.md - Deployment guide"
echo "  ✅ README.md - Project overview"
echo ""
echo "To commit changes:"
echo "  git add ."
echo "  git commit -m 'chore: remove temporary documentation'"
