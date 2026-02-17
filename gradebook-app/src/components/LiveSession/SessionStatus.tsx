import React from 'react';

const SessionStatus = ({ isActive, duration }) => {
  return (
    <div className={`session-status ${isActive ? 'active' : 'inactive'}`}>
      <h2>{isActive ? 'Session is Active' : 'Session is Inactive'}</h2>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default SessionStatus;