// Orbmania.io Game Server
// Node.js + Socket.IO + Express

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GAME_CONSTANTS } from '@orbmania/types';

const app = express();
const httpServer = createServer(app);

// Configure CORS for development
app.use(cors({
  origin: [
    'http://localhost:12000',
    'https://work-1-fgjnqynzukhomums.prod-runtime.all-hands.dev',
    'https://work-2-fgjnqynzukhomums.prod-runtime.all-hands.dev'
  ],
  credentials: true
}));

// Socket.IO server with CORS
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:12000',
      'https://work-1-fgjnqynzukhomums.prod-runtime.all-hands.dev',
      'https://work-2-fgjnqynzukhomums.prod-runtime.all-hands.dev'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: Date.now(),
    version: '0.1.0',
    players: 0, // TODO: Get from game state
    uptime: process.uptime()
  });
});

// Game state placeholder
interface GameState {
  players: Map<string, unknown>;
  shards: unknown[];
  lastTick: number;
}

const gameState: GameState = {
  players: new Map(),
  shards: [],
  lastTick: Date.now()
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('join_game', (data) => {
    console.log(`Player ${socket.id} joining game:`, data);
    
    // TODO: Add player to game state
    socket.emit('game_joined', {
      playerId: socket.id,
      gameState: {
        // Minimal state for now
        arena: GAME_CONSTANTS.ARENA_SIZE,
        tickRate: GAME_CONSTANTS.TICK_RATE
      }
    });
  });

  socket.on('player_input', (input) => {
    // TODO: Process player input
    console.log(`Input from ${socket.id}:`, input);
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    // TODO: Remove player from game state
    gameState.players.delete(socket.id);
  });
});

// Game loop placeholder - 30 Hz tick rate
const TICK_INTERVAL = 1000 / GAME_CONSTANTS.TICK_RATE;
let lastTick = Date.now();

function gameLoop() {
  const now = Date.now();
  const deltaTime = now - lastTick;
  
  if (deltaTime >= TICK_INTERVAL) {
    // TODO: Update game physics
    // TODO: Send state updates to clients
    
    lastTick = now;
  }
  
  // Use setImmediate for better performance than setTimeout
  setImmediate(gameLoop);
}

// Start server
const PORT = Number(process.env.PORT) || 12001;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Orbmania.io Server running on port ${PORT}`);
  console.log(`📊 Tick rate: ${GAME_CONSTANTS.TICK_RATE} Hz`);
  console.log(`🎮 Max players: ${GAME_CONSTANTS.MAX_PLAYERS}`);
  console.log(`🗺️  Arena size: ${GAME_CONSTANTS.ARENA_SIZE.width}x${GAME_CONSTANTS.ARENA_SIZE.height}`);
  
  // Start game loop
  gameLoop();
});