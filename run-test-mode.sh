#!/bin/bash

# CyberQuest Challenge Test Mode Setup Script

echo "====================================="
echo "CyberQuest Challenge - Test Mode Setup"
echo "====================================="

# Make sure we're in the project root
cd "$(dirname "$0")"

# Check if we have the mock files
if [ ! -f "server/db.ts.mock" ] || [ ! -f "server/routes.ts.mock" ]; then
  echo "Error: Mock files not found. Make sure you're in the project root."
  exit 1
fi

# Create backup of the original files if they exist
if [ -f "server/db.ts" ]; then
  echo "Backing up server/db.ts to server/db.ts.bak"
  cp server/db.ts server/db.ts.bak
fi

if [ -f "server/routes.ts" ]; then
  echo "Backing up server/routes.ts to server/routes.ts.bak"
  cp server/routes.ts server/routes.ts.bak
fi

# Copy the mock files
echo "Setting up mock database..."
cp server/db.ts.mock server/db.ts

echo "Setting up mock routes..."
cp server/routes.ts.mock server/routes.ts

# Create a basic .env file if it doesn't exist
if [ ! -f ".env" ]; then
  echo "Creating basic .env file..."
  echo "# This is a test environment" > .env
  echo "NODE_ENV=development" >> .env
fi

echo "Installing dependencies..."
npm install

echo "====================================="
echo "Setup complete! Starting the application in test mode..."
echo "====================================="

# Start the development server
npm run dev 