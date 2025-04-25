import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentDashboard() {
  const { schoolId, studentId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch student data
        const studentRef = doc(db, `schools/${schoolId}/students/${studentId}`);
        const studentSnap = await getDoc(studentRef);
        
        // Fetch school data
        const schoolRef = doc(db, `schools/${schoolId}`);
        const schoolSnap = await getDoc(schoolRef);
        
        // In a real app, you would fetch assignments here
        // For now, we'll just set a dummy value
        setAssignmentsCount(Math.floor(Math.random() * 10));
        
        if (studentSnap.exists()) {
          setStudentData({ id: studentSnap.id, ...studentSnap.data() });
        }
        
        if (schoolSnap.exists()) {
          setSchoolData({ id: schoolSnap.id, ...schoolSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId, studentId]);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
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
            <Text style={styles.avatarText}>{studentData?.name?.[0] || 'S'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.nameText}>{studentData?.name || 'Student'}</Text>
            <Text style={styles.gradeText}>Grade {studentData?.grade || ''}</Text>
          </View>
        </View>
      </View>

      {/* School Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>School Information</Text>
        <View style={styles.schoolInfoCard}>
          <Text style={styles.schoolName}>{schoolData?.name || 'School Name'}</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>Class: {studentData?.class || 'Not assigned'}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>Roll Number: {studentData?.rollNumber || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <View style={styles.progressIconContainer}>
              <MaterialIcons name="assignment" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.progressNumber}>{assignmentsCount}</Text>
            <Text style={styles.progressLabel}>Pending</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressIconContainer}>
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.progressNumber}>{Math.floor(Math.random() * 15)}</Text>
            <Text style={styles.progressLabel}>Completed</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressIconContainer}>
              <MaterialIcons name="star" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.progressNumber}>{Math.floor(Math.random() * 100)}</Text>
            <Text style={styles.progressLabel}>Points</Text>
          </View>
        </View>
      </View>

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="assignment" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="book" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="assessment" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Grades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="event" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Timetable</Text>
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
    backgroundColor: '#4CAF50',
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
    color: '#4CAF50',
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
  gradeText: {
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
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
}); 