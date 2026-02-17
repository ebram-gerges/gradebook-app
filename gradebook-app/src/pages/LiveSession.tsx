import React, { useState } from 'react';
import LiveSessionMode from '../components/LiveSession/LiveSessionMode';
import LiveDashboard from '../components/LiveSession/LiveDashboard';
import { Student } from '../types/student';
import useLiveSession from '../hooks/useLiveSession';

const LiveSession = () => {
  const [isLive, setIsLive] = useState(false);
  const { students, addStudent, endSession } = useLiveSession();

  const handleStartLiveSession = () => {
    setIsLive(true);
  };

  const handleEndSession = () => {
    endSession();
    setIsLive(false);
  };

  return (
    <div>
      {isLive ? (
        <LiveDashboard 
          students={students} 
          onEndSession={handleEndSession} 
        />
      ) : (
        <LiveSessionMode onSessionStart={handleStartLiveSession} />
      )}
    </div>
  );
};

export default LiveSession;