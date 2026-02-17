import { useState } from 'react';
import { Student } from '../types/student';

const useGrades = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const updateScore = (studentId: string, delta: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, score: student.score + delta } : student
      )
    );
  };

  const getTotalScore = () => {
    return students.reduce((total, student) => total + student.score, 0);
  };

  return {
    students,
    addStudent,
    updateScore,
    getTotalScore,
  };
};

export default useGrades;