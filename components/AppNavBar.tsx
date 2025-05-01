import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

type NavItem = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
};

type AppNavBarProps = {
  role: 'student' | 'teacher';
};

export function AppNavBar({ role }: AppNavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const navigationItems: NavItem[] = [
    { name: 'Home', icon: 'home', path: 'dashboard' },
    { name: 'Attendance', icon: 'calendar', path: 'attendance' },
    { name: 'Chat', icon: 'chatbubbles', path: 'chat' },
    { name: 'Results', icon: 'school', path: 'results' },
    { name: 'Profile', icon: 'person', path: 'profile' },
  ];

  const getFullPath = (path: string) => `/(${role})/${path}`;

  const handleNavigation = (path: string) => {
    router.push(getFullPath(path) as any);
  };

  const isActive = (path: string) => {
    return pathname === getFullPath(path);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.navItem,
            isActive(item.path) && styles.activeNavItem
          ]}
          onPress={() => handleNavigation(item.path)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={isActive(item.path) ? '#FF9800' : '#999'}
          />
          <ThemedText
            style={[
              styles.navLabel,
              isActive(item.path) && styles.activeNavLabel
            ]}
          >
            {item.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeNavItem: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#999',
  },
  activeNavLabel: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
});