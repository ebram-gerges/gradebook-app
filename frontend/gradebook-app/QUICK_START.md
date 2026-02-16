# Tauri Gradebook Manager - Quick Start

## 🚀 Development Server (Testing)

```bash
cd ~/Desktop/projects/session\ Managment/gradebook-app
npm run tauri dev
```

**Password:** `mr_lol_12`

The app will open in a window and fetch from `http://127.0.0.1:8000/api`.

---

## 📦 Build for Distribution

### Build Everything (All Platforms)

```bash
npm run tauri build
```

### Build Only Windows (.exe & .msi)

```bash
npm run tauri build -- --target x86_64-pc-windows-gnu
```

### Build Only Linux (.rpm & .AppImage)

```bash
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

---

## 📂 Where to Find Installers

After `npm run tauri build`:

### **Windows**

```
src-tauri/target/release/bundle/msi/Gradebook Manager_1.0.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/Gradebook Manager 1.0.0.exe
```

### **Linux**

```
src-tauri/target/release/bundle/rpm/gradebook-app-1.0.0-1.x86_64.rpm
src-tauri/target/release/bundle/appimage/gradebook-app_1.0.0_amd64.AppImage
```

---

## 🖥️ Installation for Colleagues

### **Windows Users**

1. Download `.exe` or `.msi`
2. Double-click to install
3. Launch from Start Menu

### **Linux Users (Fedora)**

1. Download `.rpm` file
2. Run: `sudo dnf install ./gradebook-app-1.0.0-1.x86_64.rpm`
3. Launch from Activities

**OR** (No installation):

1. Download `.AppImage`
2. Run: `chmod +x ./gradebook-app_1.0.0_amd64.AppImage`
3. Double-click to run

---

## ⚙️ Configuration

### Default API URL

```
http://127.0.0.1:8000/api
```

### Change API URL

Edit `src/main.js` before building:

```javascript
const API_BASE_URL = "https://your-server.com/api"; // Line 2
```

Then rebuild: `npm run tauri build`

---

## 📋 Features

✅ Glassmorphic dark theme (Windows/Linux transparent windows)  
✅ Password-protected login (`mr_lol_12`)  
✅ Double-nested Gradebook (Group → Session → Student tables)  
✅ Collapsible accordions for groups  
✅ Vanilla HTML/CSS/JS (no dependencies)  
✅ Django API integration  
✅ Data caching for performance

---

## 🔗 Links

- **Tauri Docs:** https://tauri.app/
- **Django API:** http://127.0.0.1:8000/api/
- **Build Guide:** See `BUILD_AND_DEPLOY.md`
