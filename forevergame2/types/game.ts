// Game type definitions for Forever Game 2

export interface Vector2D {
  x: number;
  y: number;
}

export interface EntityBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlayerEntity {
  position: Vector2D;
  velocity: Vector2D;
  size: { width: number; height: number };
  isGrounded: boolean;
  jumpHeld: boolean;
  jumpStartTime: number | null;
  renderer: React.ComponentType<any>;
}

export interface PlatformEntity {
  position: Vector2D;
  size: { width: number; height: number };
  renderer: React.ComponentType<any>;
}

export interface GameEntities {
  player: PlayerEntity;
  [key: string]: PlayerEntity | PlatformEntity;
}

export interface TouchEvent {
  type: 'start' | 'end' | 'move';
  event: {
    pageX: number;
    pageY: number;
  };
}

export interface GameEvent {
  type: string;
  payload?: any;
}

export interface SystemArgs {
  touches: TouchEvent[];
  time: {
    current: number;
    delta: number;
    previous: number;
  };
  dispatch: (event: GameEvent) => void;
}

// Biometric data types (for future phases)
export interface BiometricData {
  sleepDuration: number; // hours
  deepSleepMinutes: number;
  remMinutes: number;
  totalSleepMinutes: number;
  awakenings: number;
  restingHeartRate: number;
}

export interface GameParameters {
  gravity: number;
  playerSpeed: number;
  jumpHeight: number;
  friction: number;
  cameraShake: number;
  glitchFx: number;
}
