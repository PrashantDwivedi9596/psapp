import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function TeacherDashboard() {
  const { schoolId, teacherId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState<any>(null);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [studentsCount, setStudentsCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch teacher data
        const teacherRef = doc(db, `schools/${schoolId}/teachers/${teacherId}`);
        const teacherSnap = await getDoc(teacherRef);
        
        // Fetch school data
        const schoolRef = doc(db, `schools/${schoolId}`);
        const schoolSnap = await getDoc(schoolRef);
        
        // Count students
        const studentsRef = collection(db, `schools/${schoolId}/students`);
        const studentsSnap = await getDocs(studentsRef);
        
        if (teacherSnap.exists()) {
          setTeacherData({ id: teacherSnap.id, ...teacherSnap.data() });
        }
        
        if (schoolSnap.exists()) {
          setSchoolData({ id: schoolSnap.id, ...schoolSnap.data() });
        }
        
        setStudentsCount(studentsSnap.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId, teacherId]);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{teacherData?.name?.[0] || 'T'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{teacherData?.name || 'Teacher'}</Text>
            <Text style={styles.emailText}>{teacherData?.email}</Text>
          </View>
        </View>
      </View>

      {/* School Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>School Information</Text>
        <View style={styles.schoolInfoCard}>
          <Text style={styles.schoolName}>{schoolData?.name || 'School Name'}</Text>
          <Text style={styles.schoolCode}>Code: {schoolData?.code}</Text>
          <View style={styles.schoolStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="person" size={24} color="#007AFF" />
              <Text style={styles.statNumber}>{studentsCount}</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="class" size={24} color="#007AFF" />
              <Text style={styles.statNumber}>{teacherData?.classes?.length || 0}</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="people" size={28} color="#007AFF" />
            <Text style={styles.actionText}>Students</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="assignment" size={28} color="#007AFF" />
            <Text style={styles.actionText}>Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="assessment" size={28} color="#007AFF" />
            <Text style={styles.actionText}>Grades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcons name="announcement" size={28} color="#007AFF" />
            <Text style={styles.actionText}>Announcements</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  emailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  schoolInfoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  schoolCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },
  schoolStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
}); 