import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Student Results</ThemedText>
      <ThemedText>Your exam results and performance will appear here.</ThemedText>
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