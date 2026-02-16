#!/bin/bash

# Tauri Gradebook Manager - Command Reference

## Quick Commands

# Start Development Server

npm run tauri dev

# Build for All Platforms

npm run tauri build

# Build Windows Only (if on Windows)

npm run tauri build

# Build Linux Only (if on Linux)

npm run tauri build

# Build macOS Only (if on macOS)

npm run tauri build -- --target aarch64-apple-darwin

# Clean Build (if you have build issues)

cargo clean && npm run tauri build

---

## Installer Locations (After npm run tauri build)

### Windows Installers

src-tauri/target/release/bundle/msi/Gradebook Manager_1.0.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/Gradebook Manager 1.0.0.exe

### Linux Installers

src-tauri/target/release/bundle/rpm/gradebook-app-1.0.0-1.x86_64.rpm
src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage

### macOS Installer (if built on macOS)

src-tauri/target/release/bundle/dmg/Gradebook Manager_1.0.0_x64.dmg

---

## Install for End Users

### Windows

1. Download .exe from above
2. Double-click installer
3. Launch from Start Menu

### Linux (Fedora)

# Using RPM

sudo dnf install ./gradebook-app-1.0.0-1.x86_64.rpm

# OR using AppImage (no installation needed)

chmod +x ./gradebook-app_1.0.0_amd64.AppImage
./gradebook-app_1.0.0_amd64.AppImage

### macOS

1. Download .dmg file
2. Mount .dmg
3. Drag app to Applications folder
4. Launch from Applications

---

## Before Launching

# Start Django API Server

cd ~/Desktop/projects/session\ Managment/sessionManagment
python manage.py runserver

# Then in another terminal, launch the app

# (Either via npm run tauri dev OR by running the installed app)

---

## Configuration

### Change API URL

Edit: src/main.js (line 2)
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Change this

### Change Password

Edit: src/main.js (line 3)
const PASSWORD = 'mr_lol_12'; // Change this

Then rebuild: npm run tauri build

---

## Troubleshooting

# If build fails: Missing Rust

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
npm run tauri build

# If build fails on Linux: Missing webkit2gtk

sudo dnf install webkit2gtk-4.0-devel rsvg2-devel libxcb-devel

# If API connection fails

# 1. Ensure Django is running: python manage.py runserver

# 2. Check API URL in app settings

# 3. Verify firewall allows 127.0.0.1:8000

---

## File Locations

Project Root: /home/bero/Desktop/projects/session\ Managment/gradebook-app

Frontend Files:

- HTML: src/index.html
- CSS: src/styles.css
- JS: src/main.js

Tauri Configuration:

- Config: src-tauri/tauri.conf.json
- Rust: src-tauri/src/main.rs
- Manifest: src-tauri/Cargo.toml

Documentation:

- This file: COMMANDS.md
- Quick Start: QUICK_START.md
- Build Guide: BUILD_AND_DEPLOY.md
- Setup Info: SETUP_SUMMARY.md
- Migration Info: MIGRATION_SUMMARY.md
- Main Readme: README.md

---

## Development Workflow

1. Make changes to HTML/CSS/JS (src/ folder)
2. Run: npm run tauri dev
3. Changes hot-reload in dev window
4. Test all features work
5. Run: npm run tauri build (5-15 minutes, first time is slowest)
6. Find installers in src-tauri/target/release/bundle/
7. Share with colleagues

---

## Key Details

Password: mr_lol_12 (case-sensitive)
API URL: http://127.0.0.1:8000/api (configurable)
Bundle ID: com.gradebook.app
App Name: Gradebook Manager
Version: 1.0.0
Window: 1400x900px, transparent, glassmorphic

---

## Support

See documentation files for more details:

- QUICK_START.md - Fast reference
- BUILD_AND_DEPLOY.md - Comprehensive guide
- SETUP_SUMMARY.md - Configuration checklist
