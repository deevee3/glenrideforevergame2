import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { GameEngine } from '@/components/game';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <GameEngine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
