<div align="center">

# 📚 Gradebook System

### The Student Management Solution (For Real Operating Systems)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Bash](https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white)
![Linux](https://img.shields.io/badge/Made%20on-Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-features">Features</a> •
  <a href="#-usage">Usage</a>
</p>

</div>

---

## 📖 About

The **Gradebook System** is a robust Command Line Interface (CLI) tool designed to manage student academic records efficiently. It handles grade calculations, subject management, and reporting without the bloat of a GUI.

It is structured as a **Monorepo**, separating the high-performance backend logic from the frontend presentation layer.

## 📂 Project Structure

```bash
gradebook-app/
├── backend/            # 🧠 The Brain (Python Logic)
│   ├── src/           # Source code
│   └── tests/         # Unit tests
├── frontend/           # 🎨 The Face (UI Layer)
└── scripts/            # ⚡ Automation Scripts
```

---

## 🚀 Installation

### ⚠️ **CHOOSE YOUR OPERATING SYSTEM CAREFULLY**

We provide automated installation scripts to set up the environment, install dependencies, and configure the database.

### 🐧 Option 1: Linux / macOS (The Correct Choice)

If you are using **Linux** like any sane human, you can use the normal installation bash files. This will set up your virtual environment and install everything in seconds.

```bash
# Give execution permission
chmod +x scripts/install.sh

# Run the installer
./scripts/install.sh
```

### 🪟 Option 2: Windows

If you are—_Astaghfarallah_—a **Windows** user, you can use the windows bash files for low IQ human beings. We can't promise it will fix your OS, but it will install the app.

```powershell
# Double click the file below or run in PowerShell:
.\scripts\install_low_iq.bat
```

---

## ⚡ Usage

Once installed, you can launch the system directly from your terminal.

**1. Activate the environment:**

```bash
# Linux/Mac
source backend/.venv/bin/activate

# Windows (My condolences)
.\backend\.venv\Scripts\activate
```

**2. Run the application:**

```bash
python backend/src/main.py
```

## ✅ Features

- [x] **Student Management:** Add, remove, and update student records.
- [x] **Grade Calculation:** Automatic GPA and weighted average computation.
- [x] **Data Persistence:** Saves data locally (JSON/SQLite).
- [x] **Reporting:** Export class performance to CSV.

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'feat: add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

<div align="center">
  <sub>Built with pure Python and zero patience for Windows updates.</sub>
</div>
