#!/bin/bash

# ToDoMaster Quick Start Script

echo "🚀 Starting ToDoMaster Application..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please update .env with your actual DATABASE_PASSWORD"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start containers
echo "🔨 Building Docker containers..."
docker-compose build

echo "▶️  Starting services..."
docker-compose up -d

echo ""
echo "✅ ToDoMaster is starting!"
echo ""
echo "📍 Access points:"
echo "   Frontend:  http://localhost:80"
echo "   Backend:   http://localhost:8080"
echo "   Health:    http://localhost:8080/actuator/health"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose down"
echo ""
