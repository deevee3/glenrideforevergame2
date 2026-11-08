import React, { useState, useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { GameEngine as RNGameEngine } from 'react-native-game-engine';

import { createPlayer, createPlatform } from './entities';
import { Physics, Input } from './systems';
import type { GameEntities, GameEvent } from '@/types/game';

interface GameEngineProps {
  onEvent?: (event: GameEvent) => void;
}

export const GameEngine: React.FC<GameEngineProps> = ({ onEvent }) => {
  const { width, height } = useWindowDimensions();
  
  // Initialize game entities
  const createEntities = useCallback((): GameEntities => {
    const groundY = height - 100;
    
    return {
      player: createPlayer(100, groundY - 100),
      // Ground platform - spans full width
      ground: createPlatform({
        x: 0,
        y: groundY,
        width: width,
        height: 100,
        isGround: true,
      }),
      // Floating platforms for testing jump
      platform1: createPlatform({
        x: 200,
        y: groundY - 150,
        width: 150,
        height: 20,
      }),
      platform2: createPlatform({
        x: 50,
        y: groundY - 280,
        width: 120,
        height: 20,
      }),
      platform3: createPlatform({
        x: 280,
        y: groundY - 380,
        width: 100,
        height: 20,
      }),
    };
  }, [width, height]);
  
  const [entities] = useState<GameEntities>(createEntities);
  
  const handleEvent = useCallback((event: GameEvent) => {
    onEvent?.(event);
  }, [onEvent]);
  
  return (
    <View style={styles.container}>
      <RNGameEngine
        style={styles.engine}
        systems={[Input, Physics]}
        entities={entities}
        onEvent={handleEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Dark dream-like background
  },
  engine: {
    flex: 1,
  },
});
