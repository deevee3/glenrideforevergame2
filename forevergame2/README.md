# Forever Game 2

A dream-powered 2D platformer where your subconscious shapes the game. No two players experience the same universe.

## Vision

Simple-to-play, animated, endlessly-evolving game where biometric data (sleep, heart rate, activity) personalizes gameplay physics, difficulty, and aesthetics.

## Tech Stack

- **Framework**: Expo React Native
- **Game Engine**: react-native-game-engine
- **Audio**: expo-av (procedural synth)
- **Animations**: react-native-reanimated
- **Art**: AI-generated placeholder assets

## Getting Started

```bash
npm install
npx expo start
```

## Project Structure

```
app/                    # Expo Router screens
components/game/        # Game engine, entities, systems
hooks/                  # Custom hooks (game loop, biometrics)
constants/              # Physics values, biometric mappings
types/                  # TypeScript interfaces
PRD.md                  # Full product requirements
```

## Key Patterns

- **Entity-Component-System (ECS)**: Game objects as entities with renderers and systems
- **Biometric normalization**: Raw data → 0-1 range → game parameter multipliers
- **Session management**: Dream Meter, time caps, forced stops with teases

## Documentation

See [PRD.md](./PRD.md) for full product requirements and implementation details.
