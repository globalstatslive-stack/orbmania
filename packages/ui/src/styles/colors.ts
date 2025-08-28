// Orbmania.io Brand Colors - Neon-Dark Palette
// NO references to agar.io color schemes

export const ORBMANIA_COLORS = {
  // Background & Base
  BACKGROUND: '#0B1021',
  SURFACE: '#1A1F35',
  SURFACE_LIGHT: '#252B42',
  
  // Neon Accents
  CYAN: '#6EE7F2',
  AMBER: '#F59E0B', 
  GREEN: '#22C55E',
  RED: '#EF4444',
  
  // UI Elements
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#94A3B8',
  TEXT_MUTED: '#64748B',
  
  // Game Elements
  ENERGY_SHARD: '#6EE7F2',
  ORBIT_LINE: '#F59E0B',
  PLAYER_CORE: '#22C55E',
  DAMAGE_INDICATOR: '#EF4444',
  
  // Transparency variants
  CYAN_20: '#6EE7F233',
  AMBER_20: '#F59E0B33',
  GREEN_20: '#22C55E33',
  RED_20: '#EF444433',
} as const;

export type OrbmaniaColor = keyof typeof ORBMANIA_COLORS;