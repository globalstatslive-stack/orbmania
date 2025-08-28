#!/bin/bash
# Development script for Orbmania.io

set -e

echo "🚀 Starting Orbmania.io Development Environment"

# Check if ports are available
if lsof -Pi :12000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 12000 is already in use"
    exit 1
fi

if lsof -Pi :12001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 12001 is already in use"
    exit 1
fi

# Build packages first
echo "📦 Building shared packages..."
npm run build --workspace=@orbmania/types
npm run build --workspace=@orbmania/ui

# Start server in background
echo "🖥️  Starting server on port 12001..."
npm run dev --workspace=@orbmania/server &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check server health
if curl -f http://localhost:12001/health > /dev/null 2>&1; then
    echo "✅ Server is healthy"
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Start web client
echo "🌐 Starting web client on port 12000..."
npm run dev --workspace=@orbmania/web &
WEB_PID=$!

# Wait for web client to start
sleep 5

echo ""
echo "🎮 Orbmania.io Development Environment Ready!"
echo "📱 Web Client: http://localhost:12000"
echo "🖥️  Server API: http://localhost:12001"
echo "📊 Health Check: http://localhost:12001/health"
echo ""
echo "Press Ctrl+C to stop all services"

# Trap Ctrl+C and cleanup
trap 'echo "🛑 Stopping services..."; kill $SERVER_PID $WEB_PID 2>/dev/null || true; exit 0' INT

# Wait for processes
wait