#!/bin/bash
# Quick start script for Creative Corner
echo "🎨 Starting Creative Corner..."
echo "Open http://localhost:8080 in your browser"
echo ""
echo "PWA tip: Once loaded, look for the install icon in the address bar"
echo "         (or menu → Install app) for the best experience."
echo ""
echo "Press Ctrl+C to stop."

# Prefer python3 http.server
if command -v python3 &> /dev/null; then
  python3 -m http.server 8080
elif command -v python &> /dev/null; then
  python -m http.server 8080
elif command -v npx &> /dev/null; then
  npx serve . -l 8080
else
  echo "No python or npx found. Please open index.html directly or install a static server."
  exit 1
fi
