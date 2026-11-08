import { PHYSICS } from '@/constants/physics';
import type { GameEntities, SystemArgs, PlatformEntity } from '@/types/game';

/**
 * Physics System - Handles gravity, movement, and collision detection
 * Designed for "buttery, kinetic, satisfying" movement feel
 */
export const Physics = (entities: GameEntities, { time }: SystemArgs): GameEntities => {
  const player = entities.player;
  
  if (!player) return entities;
  
  // Delta time normalization (target 60fps)
  const dt = Math.min(time.delta / 16.67, 2);
  
  // Apply gravity
  player.velocity.y += PHYSICS.GRAVITY * dt;
  
  // Cap fall speed for better feel
  if (player.velocity.y > PHYSICS.MAX_FALL_SPEED) {
    player.velocity.y = PHYSICS.MAX_FALL_SPEED;
  }
  
  // Variable jump height - if holding and recently jumped, reduce gravity
  if (player.jumpHeld && player.jumpStartTime && player.velocity.y < 0) {
    const holdDuration = time.current - player.jumpStartTime;
    if (holdDuration < PHYSICS.MAX_JUMP_HOLD_TIME) {
      // Apply upward force while holding (creates floaty peak)
      player.velocity.y += PHYSICS.JUMP_HOLD_MULTIPLIER * dt;
    }
  }
  
  // Apply velocity to position
  player.position.x += player.velocity.x * dt;
  player.position.y += player.velocity.y * dt;
  
  // Apply friction
  const friction = player.isGrounded ? PHYSICS.GROUND_FRICTION : PHYSICS.AIR_FRICTION;
  player.velocity.x *= friction;
  
  // Collision detection with platforms
  let isOnGround = false;
  
  Object.keys(entities).forEach(key => {
    if (key === 'player') return;
    
    const entity = entities[key] as PlatformEntity;
    if (!entity.position || !entity.size) return;
    
    // Check collision
    const collision = checkCollision(
      {
        x: player.position.x,
        y: player.position.y,
        width: player.size.width,
        height: player.size.height,
      },
      {
        x: entity.position.x,
        y: entity.position.y,
        width: entity.size.width,
        height: entity.size.height,
      }
    );
    
    if (collision) {
      // Resolve collision from above (landing)
      const playerBottom = player.position.y + player.size.height;
      const platformTop = entity.position.y;
      const wasAbove = playerBottom - player.velocity.y * dt <= platformTop;
      
      if (wasAbove && player.velocity.y > 0) {
        player.position.y = platformTop - player.size.height;
        player.velocity.y = 0;
        isOnGround = true;
      }
    }
  });
  
  player.isGrounded = isOnGround;
  
  return entities;
};

/**
 * AABB collision detection
 */
function checkCollision(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
