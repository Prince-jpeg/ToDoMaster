@echo off
REM ToDoMaster Quick Start Script for Windows

echo Starting ToDoMaster Application...

REM Check if .env exists
if not exist .env (
    echo .env file not found. Creating from .env.example...
    copy .env.example .env
    echo Please update .env with your actual DATABASE_PASSWORD
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Build and start containers
echo Building Docker containers...
docker-compose build

echo Starting services...
docker-compose up -d

echo.
echo ToDoMaster is starting!
echo.
echo Access points:
echo    Frontend:  http://localhost:80
echo    Backend:   http://localhost:8080
echo    Health:    http://localhost:8080/actuator/health
echo.
echo View logs:
echo    docker-compose logs -f
echo.
echo Stop services:
echo    docker-compose down
echo.
