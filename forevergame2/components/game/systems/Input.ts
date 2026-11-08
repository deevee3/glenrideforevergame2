import { PHYSICS } from '@/constants/physics';
import type { GameEntities, SystemArgs, TouchEvent } from '@/types/game';

/**
 * Input System - Handles touch input for jump mechanics
 * Tap = jump, Hold = higher jump
 */
export const Input = (entities: GameEntities, { touches, time }: SystemArgs): GameEntities => {
  const player = entities.player;
  
  if (!player) return entities;
  
  touches.forEach((touch: TouchEvent) => {
    if (touch.type === 'start') {
      // Touch started - initiate jump if grounded
      if (player.isGrounded) {
        player.velocity.y = PHYSICS.JUMP_VELOCITY;
        player.isGrounded = false;
        player.jumpHeld = true;
        player.jumpStartTime = time.current;
      }
    } else if (touch.type === 'end') {
      // Touch ended - stop jump boost
      player.jumpHeld = false;
      player.jumpStartTime = null;
      
      // Cut upward velocity when releasing early (for responsive short hops)
      if (player.velocity.y < PHYSICS.JUMP_VELOCITY * 0.5) {
        player.velocity.y *= 0.5;
      }
    }
  });
  
  return entities;
};
