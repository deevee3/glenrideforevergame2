# Forever Game 2 — Product Requirements Document

## Vision

A simple-to-play, animated, endlessly-evolving 2D platformer where the content pipeline is your subconscious. No two people on Earth are ever playing the same universe.

---

## Core Concept

### Genre & Feel
- **Genre**: 2D platformer with dream-like aesthetics
- **Controls**: Ultra-simple, skill-based
  - Tap = jump
  - Hold = higher jump
  - Optional: dash/phase as second ability
- **Session structure**: Short "dream shard" levels (30–90 seconds each)
- **Movement feel**: Buttery, kinetic, satisfying — the act of moving is fun enough that stopping feels bad

### Uniqueness
- Every player's universe is shaped by their personal biometric data
- Sleep quality, duration, heart rate → world mood, difficulty, physics
- No two players experience the same game state

---

## MVP Feature Set

### Gameplay
- 2D platformer with:
  - Single-tap jump (hold = higher jump)
  - Optional dash/phase as second ability
- 4–6 handcrafted dream shard levels:
  - Each ~30–60 seconds long
  - Increasing intensity and visual weirdness
- Simple fail condition (fall, get hit 3x) with snappy restart

### Session Design
- **Hard cap**: ~10 minutes of content total
- **Structure**:
  - First open: guided experience
    - 1 ultra-short tutorial shard (20–30 seconds)
    - 2–3 increasingly wild shards showing variation
  - Session end: "Dream Cycle Complete" screen
- **Dream Meter**: Fills during play; at 100%, session ends with outro
- **Cliffhanger tactics**:
  - Tease new mechanic/area ("Next dream: Gravity Inversion Zone—play after your next sleep")
  - Show "dream forecast" based on current data, locked until next session

### Emotional Levers
- Every jump, collect, bounce pops with sound + particles
- Micro challenges almost fully mastered before session ends
- At 10-min mark: fade-out with recap ("Tonight's sleep will shape your next dream")
- Show silhouette of next boss/biome, but lock it

---

## Personalization System

### Data Inputs (Opt-in)

#### Sleep Data (from wearables)
- **Sleep duration** → length/intensity of next dream shard
- **Sleep quality** (deep sleep, REM, awakenings) → world mood
- **Heart rate** (resting/overnight) → surprise events, enemy behavior

#### Other Sources
- Time of day → lighting and pacing
- Step count/activity → mobility of world (fast scroll vs floaty)
- Mood check-in (emoji wheel or text)

### Privacy & UX
- Clear, optional permissions with obvious benefits:
  - "Connect sleep data to unlock true Dream Mode"
  - "Use activity to power new map areas"
- Data feeds into **level modifiers**, not creepy specifics

---

## Biometric → Game Parameter Mappings

### Input Normalization

#### Sleep Duration
```
sleep_duration_norm = clamp((sleep_hours - 4) / 6, 0, 1)
```
- 0.0 = very short sleep (<4h)
- 0.5 = ~7 hours (good)
- 1.0 = 10+ hours (long)

#### Sleep Quality Score
```
deep_ratio = deep_minutes / total_minutes
rem_ratio = rem_minutes / total_minutes
awakenings_norm = clamp(awakenings / 8, 0, 1)

sleep_quality = 0.5 * deep_ratio + 0.3 * rem_ratio + 0.2 * (1 - awakenings_norm)
```

#### Resting Heart Rate
```
resting_hr_norm = clamp((resting_hr - 45) / 45, 0, 1)
```
- Lower = calmer, zen
- Higher = stressed/fatigued

### Parameter Mappings

#### A. Sleep Duration → Energy / Pace

| Parameter | Formula | Effect |
|-----------|---------|--------|
| Gravity | `1.0 * lerp(1.1, 0.9, sleep_duration_norm)` | Short sleep = heavier |
| Player Speed | `1.0 * lerp(0.9, 1.1, sleep_duration_norm)` | Short sleep = sluggish |
| Level Length | `1.0 * lerp(0.8, 1.2, sleep_duration_norm)` | Short sleep = shorter levels |
| Enemy Spawn | `1.0 * lerp(1.2, 0.9, sleep_duration_norm)` | Short sleep = more enemies |

#### B. Sleep Quality → Smoothness / Difficulty

| Parameter | Formula | Effect |
|-----------|---------|--------|
| Jump Height | `1.0 * lerp(0.9, 1.1, sleep_quality)` | Poor sleep = reduced jump |
| Friction | `1.0 * lerp(1.1, 0.9, sleep_quality)` | Poor sleep = stickier |
| Trap Density | `1.0 * lerp(1.2, 0.8, sleep_quality)` | Poor sleep = more hazards |
| Checkpoint Interval | `base * lerp(0.8, 1.2, sleep_quality)` | Poor sleep = more checkpoints |

#### C. Resting Heart Rate → Intensity / Chaos

| Parameter | Formula | Effect |
|-----------|---------|--------|
| Camera Shake | `0.0 + lerp(0.0, 0.6, resting_hr_norm)` | High HR = jittery |
| Glitch FX | `lerp(0.0, 1.0, resting_hr_norm)` | High HR = glitchy visuals |
| Enemy Speed | `1.0 * lerp(0.9, 1.2, resting_hr_norm)` | High HR = faster enemies |
| Music Energy | `lerp(0.5, 1.0, resting_hr_norm)` | High HR = more percussion |

### Session Calculation Example

```javascript
// 1. Normalize inputs
sleepDurationNorm = clamp((sleepHours - 4) / 6, 0, 1);
deepRatio = deepMinutes / totalMinutes;
remRatio = remMinutes / totalMinutes;
awakeningsNorm = clamp(awakenings / 8, 0, 1);

sleepQualityScore = 0.5 * deepRatio + 0.3 * remRatio + 0.2 * (1 - awakeningsNorm);
sleepQualityScore = clamp(sleepQualityScore, 0, 1);

restingHrNorm = clamp((restingHr - 45) / 45, 0, 1);

// 2. Apply mappings
gravity       = 1.0 * lerp(1.1, 0.9, sleepDurationNorm);
playerSpeed   = 1.0 * lerp(0.9, 1.1, sleepDurationNorm);
levelLength   = 1.0 * lerp(0.8, 1.2, sleepDurationNorm);
enemySpawn    = 1.0 * lerp(1.2, 0.9, sleepDurationNorm);

jumpHeight    = 1.0 * lerp(0.9, 1.1, sleepQualityScore);
friction      = 1.0 * lerp(1.1, 0.9, sleepQualityScore);
trapDensity   = 1.0 * lerp(1.2, 0.8, sleepQualityScore);
checkpointInt = baseCheckpointInt * lerp(0.8, 1.2, sleepQualityScore);

cameraShake   = 0.0 + lerp(0.0, 0.6, restingHrNorm);
glitchFx      = lerp(0.0, 1.0, restingHrNorm);
enemySpeedMul = 1.0 * lerp(0.9, 1.2, restingHrNorm);
musicEnergy   = lerp(0.5, 1.0, restingHrNorm);
```

### Tuning Rules
- Clamp changes per session (±0.05 max from previous day)
- Softening for edge cases (poor sleep streak = cap difficulty stacking)
- Subtle UI feedback: "You slept deep—gravity feels lighter today"

---

## Technical Architecture

### Platform
- **Framework**: Expo React Native
- **Game Engine**: react-native-game-engine
- **Audio**: expo-av with procedural synth system
- **Animations**: react-native-reanimated
- **Art**: AI-generated placeholder assets

### File Structure
```
app/
  (tabs)/
    index.tsx              # Main game screen
  _layout.tsx
components/
  game/
    GameEngine.tsx         # Main game loop wrapper
    entities/
      Player.tsx           # Player entity + physics
      Platform.tsx         # Platform entity
    systems/
      Physics.ts           # Gravity, collision, movement
      Input.ts             # Touch handling
    renderers/
      PlayerRenderer.tsx
      PlatformRenderer.tsx
hooks/
  useGameLoop.ts
  useBiometricData.ts      # Mock data initially
constants/
  physics.ts               # Base physics values
  biometricMappings.ts     # Data → parameter formulas
types/
  game.ts                  # TypeScript interfaces
```

### Backend (Future)
- Simple user profile
- Flags for:
  - Connected wearables
  - Last sleep stats
  - Unlocked/completed dream shards

---

## Implementation Phases

### Phase 1: Core Movement (Current)
1. Lock the movement feel
2. One flat greybox level where movement feels addictive
3. Tap-to-jump with variable height
4. Basic collision detection

### Phase 2: Session System
1. Dream Meter implementation
2. Time-based session limits
3. Session end screen with teases
4. Level transitions

### Phase 3: Personalization v1
1. Mock biometric data system
2. Parameter mapping engine
3. Visual effects (color grading, shake)
4. Difficulty scaling

### Phase 4: Audio
1. Procedural synth system
2. Dynamic music layers
3. Juicy SFX (jump, land, collect, hit)

### Phase 5: Polish
1. Particle systems
2. AI-generated art integration
3. Smooth animations
4. UI/UX refinement

### Phase 6: Wearable Integration
1. HealthKit (iOS)
2. Google Fit (Android)
3. Real biometric data flow

---

## Success Metrics

### MVP Goal
Players finish their first 10-minute session thinking: **"Wait, that's it?! I want more."**

### Key Indicators
- Session completion rate
- Return rate (next day after sleep)
- Time-to-first-death (movement feel indicator)
- Player feedback on "feel" of controls

---

## Design Principles

1. **Movement first** — If running and jumping isn't fun, nothing else matters
2. **Subtle personalization** — Changes should feel magical, not invasive
3. **Earned anticipation** — Every session ends with a reason to return
4. **Coherent chaos** — Even wild variations feel like the same game
5. **Respect the player** — Clear opt-ins, no dark patterns

---

## References

- Visual style: Dream-like 2D platformer (see reference images)
- UI inspiration: Wordiano app (polished mobile game UI)
- Feel inspiration: Celeste, Hollow Knight (tight controls)
- Personalization: Pokémon Sleep, Ring Fit Adventure (biometric games)
