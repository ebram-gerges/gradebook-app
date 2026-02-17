#!/bin/bash

# Frontend Run Script
# This script starts the Vite frontend development server

cd "$(dirname "$0")/../frontend/gradebook-app" || exit 1

echo "Starting Gradebook Frontend..."
echo "Frontend will be available at http://localhost:5173"
echo ""

npm run dev
