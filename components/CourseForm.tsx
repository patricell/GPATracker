import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect } from 'react'

interface CourseFormProps {
  onSubmit: (courseName: string, grade: string) => void;
  onCancel: () => void;
  initialCourse?: { name: string; grade: string } | null;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, onCancel, initialCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = () => {
    if (courseName && grade) {
      onSubmit(courseName, grade);
      setCourseName('');
      setGrade('');
    }
  };

  useEffect(() => {
    if (initialCourse) {
      setCourseName(initialCourse.name);
      setGrade(initialCourse.grade.toString());
    }
  }, [initialCourse]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Course Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter course name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <Text style={styles.label}>Grade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter grade"
        value={grade}
        onChangeText={setGrade}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default CourseForm;
