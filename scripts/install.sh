#!/bin/bash

# --- Configuration & Colors ---
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function for printing status
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# --- 1. Setup Paths ---
# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
# The project root is one level up
PROJECT_ROOT="$SCRIPT_DIR/.."
# The backend is inside the project root
BACKEND_DIR="$PROJECT_ROOT/backend"

echo -e "${BOLD}🐧 Gradebook System Installer${NC}"
echo -e "---------------------------------"

# --- 2. Pre-flight Checks ---
# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    error "Python 3 is not installed. Please install it first."
    exit 1
fi

# Check if Backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    error "Could not find the 'backend' directory at:"
    echo "   $BACKEND_DIR"
    exit 1
fi

# --- 3. Virtual Environment ---
cd "$BACKEND_DIR" || exit

if [ -d ".venv" ]; then
    info "Virtual environment already exists. Skipping creation."
else
    info "Creating virtual environment (.venv)..."
    python3 -m venv .venv
    if [ $? -ne 0 ]; then
        error "Failed to create virtual environment."
        exit 1
    fi
    success "Virtual environment created."
fi

# --- 4. Install Dependencies ---
info "Installing dependencies from requirements.txt..."

# Activate venv quietly
source .venv/bin/activate

# Upgrade pip quietly
pip install --upgrade pip &> /dev/null

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        success "Dependencies installed successfully."
    else
        error "Failed to install dependencies."
        exit 1
    fi
else
    echo -e "${RED}⚠️  Warning: requirements.txt not found in backend/ directory.${NC}"
fi

# --- 5. Final Instructions ---
echo -e "---------------------------------"
echo -e "${GREEN}${BOLD}🚀 Setup Complete!${NC}"
echo -e ""
echo -e "To start the application, run these commands from the project root:"
echo -e "  ${BOLD}source backend/.venv/bin/activate${NC}"
echo -e "  ${BOLD}python backend/src/main.py${NC}"
echo -e ""