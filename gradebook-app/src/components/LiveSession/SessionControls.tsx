import React from 'react';

const SessionControls = ({ onStartSession, onRecordSession }) => {
  return (
    <div>
      <h1>Session Controls</h1>
      <button onClick={onStartSession}>Start Live Session</button>
      <button onClick={onRecordSession}>Record Past Session</button>
    </div>
  );
};

export default SessionControls;