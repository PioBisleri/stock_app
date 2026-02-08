#!/bin/bash

# Function to handle cleanup on exit
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set trap for SIGINT (Ctrl+C)
trap cleanup SIGINT

echo "🚀 Starting Stock App..."

# Start Backend
echo "📈 Starting Backend Server..."
cd backend
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi
uvicorn main:app --reload &

# Start Frontend
echo "💻 Starting Frontend..."
cd ../frontend
npm run dev &

# Wait for all background processes
wait
