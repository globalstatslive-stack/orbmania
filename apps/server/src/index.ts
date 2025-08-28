// Orbmania.io Game Server
import { GameLoop } from './game/GameLoop';
import { PhysicsEngine } from './physics/Physics';
import { Player } from './entities/Player';
import { Vector2 } from './physics/Vector2';

// Node.js + Socket.IO + Express

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PHYSICS_CONSTANTS, BALANCE_CONSTANTS, ROLE_CONSTANTS, validatePlayerInput } from '@orbmania/types';

const app = express();
const httpServer = createServer(app);

// Configure CORS for development
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:12000',
    'https://work-1-jfpewfhebejouarw.prod-runtime.all-hands.dev',
    'https://work-2-jfpewfhebejouarw.prod-runtime.all-hands.dev'
  ],
  credentials: true
}));

// Socket.IO server with CORS
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:12000',
      'https://work-1-jfpewfhebejouarw.prod-runtime.all-hands.dev',
      'https://work-2-jfpewfhebejouarw.prod-runtime.all-hands.dev'
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

// Game state (minimal)
interface GameState {
  players: Map<string, Player>;
  lastTick: number;
}

const gameState: GameState = {
  players: new Map<string, Player>(),
  lastTick: Date.now()
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('join_game', (data: { username?: string; role?: 'RUNNER' | 'BULWARK' | 'TACTICIAN' }) => {
    console.log(`Player ${socket.id} joining game:`, data);

    const role = data?.role ?? 'RUNNER';
    const spawn = { x: Math.random() * PHYSICS_CONSTANTS.ARENA_WIDTH, y: Math.random() * PHYSICS_CONSTANTS.ARENA_HEIGHT };
    const player = new Player(socket.id, data?.username ?? 'Player', role, spawn);
    gameState.players.set(socket.id, player);
    physics.add(player);

    socket.emit('game_joined', {
      playerId: socket.id,
      gameState: {
        arena: { width: PHYSICS_CONSTANTS.ARENA_WIDTH, height: PHYSICS_CONSTANTS.ARENA_HEIGHT },
        tickRate: PHYSICS_CONSTANTS.TICK_RATE
      }
    });
  });

  socket.on('player_input', (input) => {
    try {
      const valid = validatePlayerInput(input);
      const player = gameState.players.get(socket.id);
      if (player) {
        player.applyInput(new Vector2(valid.movement.x, valid.movement.y));
      }
    } catch (e) {
      console.warn('Invalid player_input from', socket.id);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    const player = gameState.players.get(socket.id);
    if (player) physics.remove(player.id);
    gameState.players.delete(socket.id);
  });
});
// Initialize physics engine and game loop
const physics = new PhysicsEngine();
const loop = new GameLoop(physics);

// Broadcast minimal tick event and minimal state for dev
loop.setOnStep((_dt, now) => {
  const players = Array.from(gameState.players.values()).map(p => ({
    id: p.id,
    x: p.position.x,
    y: p.position.y,
    vx: p.velocity.x,
    vy: p.velocity.y,
  }));
  io.emit('debug_tick', { t: now });
  io.emit('state', { t: now, players });
});

// Start server
const PORT = Number(process.env.PORT) || 12001;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Orbmania.io Server running on port ${PORT}`);
  console.log(`📊 Tick rate: ${PHYSICS_CONSTANTS.TICK_RATE} Hz`);
  console.log(`🎮 Max players per room: 50`);
  console.log(`🗺️  Arena size: ${PHYSICS_CONSTANTS.ARENA_WIDTH}x${PHYSICS_CONSTANTS.ARENA_HEIGHT}`);
  
  // Start game loop
  loop.start();
});