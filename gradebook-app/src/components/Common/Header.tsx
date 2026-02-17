import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Gradebook App</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/live-session">Live Session</a></li>
          <li><a href="/gradebook">Grade Book</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;