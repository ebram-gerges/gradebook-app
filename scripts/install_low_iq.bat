@echo off
color 0C
echo ----------------------------------------------------
echo ⚠️  DETECTING WINDOWS...
echo ⚠️  LOWERING EXPECTATIONS...
echo ----------------------------------------------------
timeout /t 2 >nul

cd backend
if %errorlevel% neq 0 (
    echo ❌ Backend directory not found. Are you in the right folder?
    pause
    exit /b
)

echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Go download it.
    pause
    exit /b
)

if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
) else (
    echo Virtual environment found.
)

echo Activating environment...
call .venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

color 0A
echo.
echo ----------------------------------------------------
echo ✅ DONE. TRY NOT TO CRASH.
echo ----------------------------------------------------
pause