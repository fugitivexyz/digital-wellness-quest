@echo off
echo =====================================
echo CyberQuest Challenge - Test Mode Setup
echo =====================================

:: Change to the directory where the batch file is located
cd /d "%~dp0"

:: Check if we have the mock files
if not exist "server\db.ts.mock" (
  echo Error: Mock files not found. Make sure you're in the project root.
  exit /b 1
)

if not exist "server\routes.ts.mock" (
  echo Error: Mock files not found. Make sure you're in the project root.
  exit /b 1
)

:: Create backup of the original files if they exist
if exist "server\db.ts" (
  echo Backing up server\db.ts to server\db.ts.bak
  copy "server\db.ts" "server\db.ts.bak"
)

if exist "server\routes.ts" (
  echo Backing up server\routes.ts to server\routes.ts.bak
  copy "server\routes.ts" "server\routes.ts.bak"
)

:: Copy the mock files
echo Setting up mock database...
copy "server\db.ts.mock" "server\db.ts"

echo Setting up mock routes...
copy "server\routes.ts.mock" "server\routes.ts"

:: Create a basic .env file if it doesn't exist
if not exist ".env" (
  echo Creating basic .env file...
  echo # This is a test environment > .env
  echo NODE_ENV=development >> .env
)

echo Installing dependencies...
call npm install

echo =====================================
echo Setup complete! Starting the application in test mode...
echo =====================================

:: Start the development server
call npm run dev 