# Tauri v2 Gradebook Manager - Complete Setup Summary

## Project Location

```
/home/bero/Desktop/projects/session Managment/gradebook-app
```

## Critical Files Configuration

### 1. **tauri.conf.json** (src-tauri/tauri.conf.json)

✅ **Already Configured**

- Window: 1400x900px, transparent enabled
- Bundle Identifier: `com.gradebook.app`
- HTTP Scope: `http://127.0.0.1:8000/**` and `http://localhost:8000/**`
- Targets: `msi`, `nsis`, `rpm`, `appimage`, `dmg`
- Windows: Acrylic transparency enabled
- Linux: Native transparency enabled

### 2. **index.html** (src/index.html)

✅ **Configured**

- Login overlay (password: `mr_lol_12`)
- Sidebar navigation (Gradebook, Groups, Students, Sessions)
- Glassmorphic UI elements
- Settings modal for API URL configuration

### 3. **styles.css** (src/styles.css)

✅ **Configured**

- CSS Variables for theming
- Glassmorphism: `backdrop-filter: blur(16px)`, semi-transparent RGBA colors
- Login card, sidebar, accordion, tables styled
- Dark gradient background (#0f0f1e to #1a1a2e)
- Accent color: #6366f1 (purple)

### 4. **main.js** (src/main.js)

✅ **Configured**

- Login validation (password: `mr_lol_12`)
- API Base URL: `http://127.0.0.1:8000/api` (stored in localStorage)
- Fetch API with 8-second timeout
- Data caching to prevent duplicate requests
- Lazy loading for views
- Double-nested gradebook grouping: Group → Session → Students
- Accordion toggle functionality
- View switching (Groups, Students, Sessions, Gradebook)

---

## Commands Reference

### Development

```bash
cd ~/Desktop/projects/session\ Managment/gradebook-app
npm run tauri dev
```

- Opens dev window with hot-reload
- API: http://127.0.0.1:8000/api
- Password: mr_lol_12

### Build (All Platforms)

```bash
npm run tauri build
```

- Compiles for Windows, Linux, macOS
- Creates `.exe`, `.msi` (Windows), `.rpm`, `.AppImage` (Linux), `.dmg` (macOS)

### Build Specific Platform

```bash
# Windows only
npm run tauri build -- --target x86_64-pc-windows-gnu

# Linux only
npm run tauri build -- --target x86_64-unknown-linux-gnu

# macOS only (requires macOS)
npm run tauri build -- --target aarch64-apple-darwin
```

### Clean Build

```bash
cargo clean
npm run tauri build
```

---

## Installation Locations (After Build)

### Windows Installers

```
src-tauri/target/release/bundle/msi/Gradebook Manager_1.0.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/Gradebook Manager 1.0.0.exe
```

### Linux Installers

```
src-tauri/target/release/bundle/rpm/gradebook-app-1.0.0-1.x86_64.rpm
src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage
```

### macOS Installer (if built on macOS)

```
src-tauri/target/release/bundle/dmg/Gradebook Manager_1.0.0_x64.dmg
```

---

## Distribution Checklist

### Before Building

- [ ] Ensure Django API is running: `python manage.py runserver`
- [ ] Test app in dev mode: `npm run tauri dev`
- [ ] Verify password works: `mr_lol_12`
- [ ] Check API URL is correct (default: `http://127.0.0.1:8000/api`)
- [ ] Test accordion collapse/expand
- [ ] Test all views load correctly

### Building

- [ ] Run: `npm run tauri build`
- [ ] Wait for build to complete (5-15 minutes depending on system)
- [ ] Check for errors in terminal

### After Building

- [ ] Locate `.exe` or `.msi` for Windows users
- [ ] Locate `.rpm` or `.AppImage` for Linux users
- [ ] Test installers on target systems
- [ ] Create distribution package

### Distribution

- [ ] Send installers via email, cloud storage, or USB
- [ ] Provide instructions: `QUICK_START.md` and `BUILD_AND_DEPLOY.md`
- [ ] Ensure colleagues have Django server running
- [ ] Confirm login works with password `mr_lol_12`

---

## Key Features Summary

| Feature                      | Status | Location                |
| ---------------------------- | ------ | ----------------------- |
| Glassmorphism Theme          | ✅     | styles.css              |
| Login Overlay                | ✅     | index.html + main.js    |
| Sidebar Navigation           | ✅     | index.html + main.js    |
| Gradebook (Double Accordion) | ✅     | main.js (loadGradebook) |
| Groups View                  | ✅     | main.js (loadGroups)    |
| Students View                | ✅     | main.js (loadStudents)  |
| Sessions View                | ✅     | main.js (loadSessions)  |
| API Integration              | ✅     | main.js (fetchAPI)      |
| Data Caching                 | ✅     | main.js (dataCache)     |
| Lazy Loading                 | ✅     | main.js (loadedViews)   |
| Settings Modal               | ✅     | index.html + main.js    |
| Windows Transparency         | ✅     | tauri.conf.json         |
| Linux Transparency           | ✅     | tauri.conf.json         |
| Auto-scaling Window          | ✅     | tauri.conf.json         |
| Icon/Brand                   | ✅     | src-tauri/icons/        |

---

## Troubleshooting

### Build Fails: "Cannot find rustc"

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
npm run tauri build
```

### Build Fails on Linux: "Missing webkit2gtk"

```bash
# Fedora
sudo dnf install webkit2gtk-4.0-devel rsvg2-devel libxcb-devel

# Ubuntu
sudo apt-get install libwebkit2gtk-4.0-dev libssl-dev libappindicator3-dev librsvg2-dev

npm run tauri build
```

### App Won't Connect to API

1. Ensure Django is running: `python manage.py runserver`
2. Check API URL in DevTools → Storage → Local Storage → `apiUrl`
3. Verify firewall allows `127.0.0.1:8000`

### App Window Not Transparent

- Verify `tauri.conf.json` has `"transparent": true`
- Rebuild: `npm run tauri build`
- Windows 10/11 may need Acrylic effect enabled (done in config)

### Password Not Working

- Password is case-sensitive: `mr_lol_12` (lowercase)
- Verify in `main.js` line 10: `const PASSWORD = 'mr_lol_12';`

---

## Support Resources

- **Tauri Official Docs:** https://tauri.app/
- **Tauri Prerequisites:** https://tauri.app/guides/prerequisites/
- **Building Apps:** https://tauri.app/guides/building/
- **Troubleshooting:** https://tauri.app/guides/troubleshooting/
- **GitHub Issues:** https://github.com/tauri-apps/tauri/issues

---

## Version Information

- **Tauri:** v2.0.0+
- **Node.js:** 18.0.0+
- **Rust:** 1.70.0+
- **Electron Replaced With:** Tauri (more lightweight, native features)
- **Django API:** Remains unchanged (remote or local)

---

## Next Steps

1. Test development mode: `npm run tauri dev`
2. Build for distribution: `npm run tauri build`
3. Find installers in `src-tauri/target/release/bundle/`
4. Share with colleagues (provide `QUICK_START.md`)
5. Ensure they have Django server running
6. They can login with password `mr_lol_12`

**Total Build Time:** 5-15 minutes (first build is slowest)
**App Size (Bundled):** ~50-100MB per platform
**Requirement for Colleagues:** Nothing extra! Just run installer and Django API.
