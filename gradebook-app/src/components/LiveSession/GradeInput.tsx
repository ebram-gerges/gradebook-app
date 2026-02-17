import React, { useState } from 'react';

const GradeInput = ({ onScoreChange, studentId }) => {
  const [score, setScore] = useState(0);

  const handleInputChange = (e) => {
    setScore(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onScoreChange(studentId, score);
    setScore(0); // Reset input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={score} 
        onChange={handleInputChange} 
        placeholder="Enter score" 
        required 
      />
      <button type="submit">Submit Score</button>
    </form>
  );
};

export default GradeInput;