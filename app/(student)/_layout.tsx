import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Student Dashboard',
          headerShown: true,
        }}
      />
    </Stack>
  );
} 