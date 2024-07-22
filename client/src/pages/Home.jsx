import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  );
}
