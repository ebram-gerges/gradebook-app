import React from 'react';
import { Student } from '../../types/student';

interface StudentListProps {
  students: Student[];
  onScoreChange: (id: string, delta: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onScoreChange }) => {
  return (
    <div>
      {students.map(student => (
        <div key={student.id}>
          <h2>{student.name}</h2>
          <p>Score: {student.score}</p>
          <div>
            <button onClick={() => onScoreChange(student.id, 1)}>+1</button>
            <button onClick={() => onScoreChange(student.id, 3)}>+3</button>
            <button onClick={() => onScoreChange(student.id, 5)}>+5</button>
            <button onClick={() => onScoreChange(student.id, -1)}>-1</button>
            <button onClick={() => onScoreChange(student.id, -3)}>-3</button>
            <button onClick={() => onScoreChange(student.id, -5)}>-5</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;