@echo off
color 0B
echo ----------------------------------------------------
echo 🚀 STARTING BACKEND SERVER
echo    (Please wait, loading takes time on Windows...)
echo ----------------------------------------------------

cd backend
if %errorlevel% neq 0 (
    echo ❌ Backend folder missing.
    pause
    exit /b
)

if not exist .venv (
    echo ❌ Virtual Environment missing!
    echo    Please run 'scripts\install_low_iq.bat' first.
    pause
    exit /b
)

echo Activating environment...
call .venv\Scripts\activate.bat

if not exist manage.py (
    echo ❌ manage.py is missing!
    pause
    exit /b
)

echo.
echo ✅ Server is starting...
echo    Go to http://127.0.0.1:8000/ in your browser.
echo    Press CTRL+C to stop.
echo.

python manage.py runserver
pause