@echo off
echo Fixing Mini Game Hub project...

echo 1. Cleaning up old files...
rmdir /s /q node_modules
del package-lock.json

echo 2. Clearing npm cache...
npm cache clean --force

echo 3. Installing dependencies...
npm install

echo 4. Starting the development server...
npm start

pause
