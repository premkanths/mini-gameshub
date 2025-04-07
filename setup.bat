@echo off
echo Installing dependencies for Mini Game Hub...
call npm install react react-dom react-router-dom @heroicons/react typescript @types/react @types/react-dom tailwindcss postcss autoprefixer
echo Setting up Tailwind CSS...
call npx tailwindcss init -p
echo Setup complete! Run 'npm start' to start the development server.
pause
