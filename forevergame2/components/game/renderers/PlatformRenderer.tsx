import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PLATFORM_CONFIG } from '@/constants/physics';
import type { PlatformEntity } from '@/types/game';

interface PlatformRendererProps {
  position: PlatformEntity['position'];
  size: PlatformEntity['size'];
  isGround?: boolean;
}

export const PlatformRenderer: React.FC<PlatformRendererProps> = ({ 
  position, 
  size,
  isGround = false,
}) => {
  return (
    <View
      style={[
        styles.platform,
        {
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          backgroundColor: isGround ? PLATFORM_CONFIG.GROUND_COLOR : PLATFORM_CONFIG.COLOR,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  platform: {
    position: 'absolute',
    borderRadius: 4,
  },
});
