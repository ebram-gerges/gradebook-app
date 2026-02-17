import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gradebook">Gradebook</Link>
        </li>
        <li>
          <Link to="/live-session">Live Session</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;