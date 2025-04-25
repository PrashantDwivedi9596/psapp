import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="SchoolCode"
        options={{
          title: 'School Code',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RoleSelection"
        options={{
          title: 'Select Role',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeacherLogin"
        options={{
          title: 'Teacher Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentLogin"
        options={{
          title: 'Student Login',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
