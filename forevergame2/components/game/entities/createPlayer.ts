import { PlayerRenderer } from '../renderers/PlayerRenderer';
import { PLAYER_CONFIG } from '@/constants/physics';
import type { PlayerEntity } from '@/types/game';

export const createPlayer = (x?: number, y?: number): PlayerEntity => {
  return {
    position: {
      x: x ?? PLAYER_CONFIG.START_X,
      y: y ?? PLAYER_CONFIG.START_Y,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    size: {
      width: PLAYER_CONFIG.WIDTH,
      height: PLAYER_CONFIG.HEIGHT,
    },
    isGrounded: false,
    jumpHeld: false,
    jumpStartTime: null,
    renderer: PlayerRenderer,
  };
};
