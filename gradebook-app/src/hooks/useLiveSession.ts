import { useState, useEffect } from 'react';
import { Student } from '../types/student';

const useLiveSession = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSessionActive) {
      timer = setInterval(() => {
        setSessionDuration(prevDuration => prevDuration + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isSessionActive]);

  const startSession = () => {
    setIsSessionActive(true);
    setSessionDuration(0);
    setStudents([]); // Reset students for a new session
  };

  const endSession = () => {
    setIsSessionActive(false);
  };

  const addStudent = (student: Student) => {
    setStudents(prevStudents => [...prevStudents, student]);
  };

  const updateStudentScore = (studentId: string, delta: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, score: student.score + delta } : student
      )
    );
  };

  return {
    students,
    sessionDuration,
    isSessionActive,
    startSession,
    endSession,
    addStudent,
    updateStudentScore,
  };
};

export default useLiveSession;