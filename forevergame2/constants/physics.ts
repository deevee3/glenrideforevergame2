// Base physics constants for Forever Game 2
// These values are multiplied by biometric modifiers

export const PHYSICS = {
  // Gravity
  GRAVITY: 0.8,
  
  // Player movement
  PLAYER_SPEED: 5,
  MAX_FALL_SPEED: 15,
  
  // Jump physics - tuned for "buttery, kinetic, satisfying" feel
  JUMP_VELOCITY: -18, // Initial jump impulse (negative = up)
  JUMP_HOLD_MULTIPLIER: 0.4, // Additional upward force while holding
  MAX_JUMP_HOLD_TIME: 200, // Max ms that holding adds height
  
  // Ground physics
  GROUND_FRICTION: 0.85,
  AIR_FRICTION: 0.95,
  
  // Collision
  GROUND_Y: 500, // Default ground level
};

export const PLAYER_CONFIG = {
  WIDTH: 50,
  HEIGHT: 70,
  START_X: 100,
  START_Y: 400,
  COLOR: '#FF6B6B', // Warm coral - dreamlike
};

export const PLATFORM_CONFIG = {
  COLOR: '#4ECDC4', // Teal - contrasting dream aesthetic
  GROUND_COLOR: '#2C3E50', // Dark blue-gray for ground
};

// Screen dimensions will be set dynamically
export const SCREEN = {
  WIDTH: 0,
  HEIGHT: 0,
};
