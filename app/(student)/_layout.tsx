import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { AppNavBar } from '../../components/AppNavBar';

export default function StudentLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="dashboard"
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="attendance"
            options={{
              title: 'Attendance',
            }}
          />
          <Stack.Screen
            name="chat"
            options={{
              title: 'Chat',
            }}
          />
          <Stack.Screen
            name="results"
            options={{
              title: 'Results',
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              title: 'Profile',
            }}
          />
        </Stack>
      </View>
      <AppNavBar role="student" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
});