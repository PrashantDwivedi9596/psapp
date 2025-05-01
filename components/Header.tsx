import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

export default function Header() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const logoSource = colorScheme === 'dark'
    ? require('../assets/logo/present_sir_night_logo.jpg')
    : require('../assets/logo/present_sir_day-logo.jpg');

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          backgroundColor: '#FF9800', // Orange theme
        }
      ]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={logoSource}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>PresentSir</ThemedText>
      </View>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  iconButton: {
    padding: 8,
  },
});