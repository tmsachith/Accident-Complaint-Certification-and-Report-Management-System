import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const containerStyle = {
    textAlign: 'center', // This centers the text and inline elements like images
    padding: '20px'
  };

  const imageStyle = {
    width: '35%', // Set image width to 35%
    height: 'auto', // Maintain aspect ratio
    display: 'block', // Ensures the image is treated as a block element
    margin: '20px auto' // Centers the block element horizontally and adds top and bottom margin
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome, {username}!</h1>
      <img 
        src="https://static.wixstatic.com/media/4543d8_a1e668da85774a3ba3bba5abd3598a47~mv2.jpg" 
        alt="Decorative" 
        style={imageStyle} 
      />
    </div>
  );
}
