import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Manage Results</ThemedText>
      <ThemedText>Upload and manage student results here.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});