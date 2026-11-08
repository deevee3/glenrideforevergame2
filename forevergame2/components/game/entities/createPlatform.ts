import { PlatformRenderer } from '../renderers/PlatformRenderer';
import type { PlatformEntity } from '@/types/game';

interface PlatformOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  isGround?: boolean;
}

export const createPlatform = (options: PlatformOptions): PlatformEntity & { isGround?: boolean } => {
  return {
    position: {
      x: options.x,
      y: options.y,
    },
    size: {
      width: options.width,
      height: options.height,
    },
    isGround: options.isGround,
    renderer: PlatformRenderer,
  };
};
