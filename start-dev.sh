#!/bin/bash

# 🚀 StoryVault Steward - Development Startup Script
# Starts both API server and frontend in parallel

echo "🏛️  Starting StoryVault Steward..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "Please create .env with GOOGLE_API_KEY"
    exit 1
fi

# Start API server in background
echo -e "${PURPLE}📡 Starting API Server...${NC}"
npm run server &
API_PID=$!

# Wait for API to be ready
echo "⏳ Waiting for API server to start..."
for i in {1..10}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ API Server ready on http://localhost:3001${NC}"
        break
    fi
    sleep 1
done

# Start frontend in background
echo -e "${BLUE}🎨 Starting Frontend...${NC}"
cd frontend && npm run dev &
FRONTEND_PID=$!

# Wait for frontend to be ready
echo "⏳ Waiting for frontend to start..."
sleep 3
echo -e "${GREEN}✅ Frontend ready on http://localhost:3000${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${PURPLE}🎉 StoryVault Steward is running!${NC}"
echo ""
echo -e "📡 API Server:  ${BLUE}http://localhost:3001${NC}"
echo -e "🎨 Frontend:    ${BLUE}http://localhost:3000${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Wait for user interrupt
trap "echo '\n🛑 Stopping servers...'; kill $API_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Keep script running
wait
