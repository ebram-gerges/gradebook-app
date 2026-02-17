export const calculateAverageScore = (scores) => {
  if (scores.length === 0) return 0;
  const total = scores.reduce((acc, score) => acc + score, 0);
  return total / scores.length;
};

export const calculateTotalScore = (students) => {
  return students.reduce((acc, student) => acc + student.score, 0);
};

export const updateStudentScore = (students, studentId, delta) => {
  return students.map(student => 
    student.id === studentId ? { ...student, score: student.score + delta } : student
  );
};