import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PLAYER_CONFIG } from '@/constants/physics';
import type { PlayerEntity } from '@/types/game';

interface PlayerRendererProps {
  position: PlayerEntity['position'];
  size: PlayerEntity['size'];
}

export const PlayerRenderer: React.FC<PlayerRendererProps> = ({ position, size }) => {
  return (
    <View
      style={[
        styles.player,
        {
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    backgroundColor: PLAYER_CONFIG.COLOR,
    borderRadius: 8,
    // Add subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
