import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import CourseForm from '@/components/CourseForm';

interface Course {
  id: string;
  name: string;
  grade: string;
}

export default function Index() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const handleAddCourse = (courseName: string, grade: string) => {
    setCourses([...courses, { id: Date.now().toString(), name: courseName, grade }]);
    setIsModalVisible(false);
  };

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
  
    let total = 0;
  
    for (let i = 0; i < courses.length; i++) {
      total += Number(courses[i].grade);
    }
    
    return (total / courses.length).toFixed(2);
  };

  const handleEditCourse = (courseId: string, courseName: string, grade: string) => {
    const gradeValue = parseFloat(grade);
    if (!isNaN(gradeValue)) {
      setCourses(courses.map(course => course.id === courseId ? { ...course, name: courseName, grade: grade } : course));
      setEditCourse(null);
    }
    setIsModalVisible(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gpaHeader}>
        <Text style={styles.gpaText}>GPA: {calculateGPA()}</Text>
      </View>

      <Button title="Add Course" onPress={() => setIsModalVisible(true)} />
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.name} - Grade: {item.grade}</Text>
            <TouchableOpacity onPress={() => { setIsModalVisible(true); setEditCourse(item); }}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteCourse(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <CourseForm onSubmit={(courseName, grade) => editCourse ? handleEditCourse(editCourse.id, courseName, grade) : handleAddCourse(courseName, grade)}
          onCancel={() => setIsModalVisible(false)}
          initialCourse={editCourse} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  courseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  gpaHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4a90e2',
  },
  gpaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  editButton: {
    color: '#1e90ff',
    fontSize: 16,
  },
  deleteButton: {
    color: '#ff4d4d',
    fontSize: 16,
  }
});
