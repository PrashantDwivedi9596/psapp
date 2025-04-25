import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function RoleSelection() {
  const { schoolId } = useLocalSearchParams();

  const handleRoleSelect = (role: 'teacher' | 'student') => {
    router.push({
      pathname: role === 'teacher' ? '/(auth)/TeacherLogin' : '/(auth)/StudentLogin',
      params: { schoolId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>Choose how you want to login</Text>
        
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => handleRoleSelect('teacher')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>T</Text>
            </View>
            <Text style={styles.roleTitle}>Teacher</Text>
            <Text style={styles.roleDescription}>Login as a teacher with your credentials</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => handleRoleSelect('student')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>S</Text>
            </View>
            <Text style={styles.roleTitle}>Student</Text>
            <Text style={styles.roleDescription}>Login as a student with your username</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  roleContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 