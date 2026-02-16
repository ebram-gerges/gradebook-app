# Tauri v2 Gradebook Manager - Build & Deployment Guide

## Prerequisites

### System Requirements

- **Node.js:** v18+ (for npm)
- **Rust:** Latest stable (https://rustup.rs/)
- **Linux (Fedora):**
  - `sudo dnf install webkit2gtk-4.0-devel rsvg2-devel libxcb-devel`
- **Windows:**
  - Windows 10/11 (build 19043+)
  - Visual Studio Build Tools (C++ workload) or full Visual Studio

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
rustc --version   # Should be 1.70+
cargo --version   # Should match rustc
```

---

## Development Setup

### 1. Initialize Project (Already Done)

```bash
cd "~/Desktop/projects/session Managment"
npm create tauri-app@latest gradebook-app -- --manager npm --ui vanilla --typescript false --ci
cd gradebook-app
npm install
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run tauri dev
```

This will:

- Start a local dev server on `http://localhost:5173`
- Launch the Tauri window with hot-reload enabled
- Allow you to test the app in development mode

### 4. Login

- **Password:** `mr_lol_12`
- The app will fetch data from `http://127.0.0.1:8000/api`

---

## Configuration

### Update API URL (At Runtime)

The app stores the API URL in `localStorage` by default as `http://127.0.0.1:8000/api`.

To change it:

1. Open Developer Tools (Right-click → Inspect)
2. Go to Storage → Local Storage
3. Edit the `apiUrl` key
4. Refresh the page

**OR** click the Settings button (when implemented) to change it via UI.

### Tauri Configuration (`src-tauri/tauri.conf.json`)

- **Window:** 1400x900px, transparent background enabled
- **Bundle Identifier:** `com.gradebook.app`
- **HTTP Permissions:** Allows requests to `http://127.0.0.1:8000/**` and `http://localhost:8000/**`
- **Transparency:** Enabled for glassmorphism effect on both Windows and Linux

---

## Building for Distribution

### Build Command (All Platforms)

```bash
npm run tauri build
```

This command:

- Compiles the Rust backend
- Bundles the frontend (vanilla HTML/CSS/JS)
- Creates platform-specific installers

### Output Locations

After running `npm run tauri build`:

#### **Windows (.exe)**

```
src-tauri/target/release/bundle/msi/Gradebook Manager_1.0.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/Gradebook Manager 1.0.0.exe
```

#### **Linux (.rpm)**

```
src-tauri/target/release/bundle/rpm/gradebook-app-1.0.0-1.x86_64.rpm
src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage
```

#### **macOS (.dmg)** (If building on macOS)

```
src-tauri/target/release/bundle/dmg/Gradebook Manager_1.0.0_x64.dmg
```

---

## Platform-Specific Build Instructions

### **Building for Windows (.exe)**

#### On Windows PC:

```bash
npm run tauri build
```

Output: `.exe` and `.msi` installers in `src-tauri/target/release/bundle/`

#### On Linux/macOS (Cross-compilation):

```bash
npm run tauri build -- --target x86_64-pc-windows-gnu
```

**Note:** Requires `mingw-w64` installed.

### **Building for Linux (.rpm & .AppImage)**

#### On Fedora/RHEL:

```bash
# Install dependencies (one-time)
sudo dnf install webkit2gtk-4.0-devel rsvg2-devel libxcb-devel

# Build
npm run tauri build
```

Output:

- `.rpm` → `src-tauri/target/release/bundle/rpm/`
- `.AppImage` → `src-tauri/target/release/bundle/appimage/`

#### Install the .rpm:

```bash
sudo dnf install ./src-tauri/target/release/bundle/rpm/gradebook-app-1.0.0-1.x86_64.rpm
```

#### Run the .AppImage:

```bash
chmod +x ./src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage
./src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage
```

---

## Distribution to Colleagues

### Step 1: Build the Application

```bash
npm run tauri build
```

### Step 2: Collect the Installers

#### **For Windows Users:**

- Copy `.exe` or `.msi` from `src-tauri/target/release/bundle/msi/` or `nsis/`
- Send via email, cloud storage (Google Drive, OneDrive), or USB
- Recipients run the installer and click "Next" to install

#### **For Linux (Fedora) Users:**

- Copy `.rpm` from `src-tauri/target/release/bundle/rpm/`
- Send the file
- Recipients run: `sudo dnf install ./gradebook-app-1.0.0-1.x86_64.rpm`

**OR** use AppImage (no installation needed):

- Copy `.AppImage` from `src-tauri/target/release/bundle/appimage/`
- Recipients make it executable: `chmod +x gradebook-app_1.0.0_amd64.AppImage`
- Run directly: `./gradebook-app_1.0.0_amd64.AppImage`

### Step 3: Ensure Django API is Running

Before colleagues launch the app, make sure the Django server is running:

```bash
cd ~/Desktop/projects/session\ Managment/sessionManagment
python manage.py runserver
```

The app will connect to `http://127.0.0.1:8000/api` by default.

### Step 4: Configuration for Production

If colleagues need to connect to a **different API URL** (e.g., a remote server):

1. Modify `main.js` before building:
   ```javascript
   const API_BASE_URL = "https://your-server.com/api"; // Change this
   ```
2. Rebuild: `npm run tauri build`
3. Share the new installer

---

## Environment-Specific Settings

### Development

- API URL: `http://127.0.0.1:8000/api`
- Dev Tools: Enabled
- Transparency: Enabled for glassmorphism

### Production

- API URL: `https://your-api-server.com/api` (update in `main.js`)
- Dev Tools: Disabled (already set in `tauri.conf.json`)
- Bundle Size: ~50-100MB (depends on platform)

---

## Troubleshooting

### "Cannot find Rust"

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

### "API Connection Failed"

- Ensure Django server is running: `python manage.py runserver`
- Verify API URL in DevTools → Storage → Local Storage
- Check firewall allows `127.0.0.1:8000`

### "Build Failed on Linux"

```bash
sudo dnf install webkit2gtk-4.0-devel rsvg2-devel libxcb-devel
```

### "Window is Blank or Not Transparent"

- Ensure `tauri.conf.json` has `"transparent": true`
- Rebuild: `npm run tauri build`

### "Password Not Working"

- Verify password is exactly `mr_lol_12` (case-sensitive)
- Check `main.js` line 10: `const PASSWORD = 'mr_lol_12';`

---

## Quick Reference

| Task                   | Command                                                    |
| ---------------------- | ---------------------------------------------------------- |
| **Dev Server**         | `npm run tauri dev`                                        |
| **Build All**          | `npm run tauri build`                                      |
| **Build Windows Only** | `npm run tauri build -- --target x86_64-pc-windows-gnu`    |
| **Build Linux Only**   | `npm run tauri build -- --target x86_64-unknown-linux-gnu` |
| **Clean Build**        | `cargo clean && npm run tauri build`                       |
| **Check Errors**       | `npm run tauri build 2>&1 \| tee build.log`                |

---

## File Structure

```
gradebook-app/
├── src/
│   ├── index.html          # Login UI + Dashboard
│   ├── styles.css          # Glassmorphism theme
│   ├── main.js             # App logic + API calls
│   └── assets/
├── src-tauri/
│   ├── tauri.conf.json     # Window & bundle config (configured for Windows/Linux)
│   ├── src/
│   │   └── main.rs         # Rust backend (minimal for Tauri)
│   ├── Cargo.toml          # Rust dependencies
│   └── icons/              # App icons (for installers)
├── package.json            # npm configuration
└── README.md
```

---

## Support

- **Tauri Docs:** https://tauri.app/
- **Tauri Desktop Plugins:** https://tauri.app/plugins/
- **Build Troubleshooting:** https://tauri.app/guides/troubleshooting/
