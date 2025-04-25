import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function SchoolCode() {
  const [schoolCode, setSchoolCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const verifySchoolCode = async () => {
    if (!schoolCode.trim()) {
      setError('Please enter a school code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const schoolsRef = collection(db, 'schools');
      const q = query(schoolsRef, where('code', '==', schoolCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const schoolDoc = querySnapshot.docs[0];
        router.push({
          pathname: '/(auth)/RoleSelection',
          params: { schoolId: schoolDoc.id }
        });
      } else {
        setError('Invalid school code');
      }
    } catch (err) {
      setError('Error verifying school code');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Enter your school code to continue</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter school code"
          placeholderTextColor="#888"
          value={schoolCode}
          onChangeText={setSchoolCode}
          autoCapitalize="none"
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={verifySchoolCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff3b30',
    marginBottom: 15,
    fontSize: 14,
  },
});
