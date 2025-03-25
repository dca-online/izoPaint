@echo off
echo Starting Next.js development server for mobile testing...
echo.
echo Your local IP addresses:
ipconfig | findstr "IPv4"
echo.
echo Your server will be accessible on these addresses at port 3000
echo.
npm run dev -- --host 0.0.0.0 