#!/bin/bash

# --- Colors ---
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# --- Setup Paths ---
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."
BACKEND_DIR="$PROJECT_ROOT/backend"

echo -e "${BLUE}🚀 Starting Gradebook Backend...${NC}"

# --- Checks ---
if [ ! -d "$BACKEND_DIR/.venv" ]; then
    echo -e "${RED}❌ Virtual environment not found!${NC}"
    echo "Please run './scripts/install.sh' first."
    exit 1
fi

# --- Run ---
cd "$BACKEND_DIR" || exit
source .venv/bin/activate

# Check if manage.py exists
if [ -f "manage.py" ]; then
    echo -e "${GREEN}✅ Environment active. Server launching at http://127.0.0.1:8000/${NC}"
    echo "Press CTRL+C to stop."
    python manage.py runserver
else
    echo -e "${RED}❌ manage.py not found. Are you in the right directory?${NC}"
    exit 1
fi