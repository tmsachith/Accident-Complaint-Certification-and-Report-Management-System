import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Styled components for the header
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #6ab04c, #3b945e);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  h1 {
    margin: 0;
    font-size: 24px;
    color: #ffffff;
    font-weight: bold;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled(Link)`
  --primary-color: background: linear-gradient(90deg, #6ab04c, #3b945e);
  --secondary-color: #fff;
  background: linear-gradient(90deg, #6ab04c, #3b945e);
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: var(--hover-color);
  }

  &:hover .arrow {
    background: var(--secondary-color);
  }

  &:hover .arrow:before {
    right: 0;
  }

  .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
  }

  .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }
`;

const NotificationIcon = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: white;

  .notification-count {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 0 6px;
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const [position, setPosition] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPosition = localStorage.getItem('position');
    if (!storedUsername && (location.pathname === '/dashboard' || location.pathname === '/complaints')) {
      navigate('/sign-in');
    } else {
      setUsername(storedUsername);
      setPosition(storedPosition);
    }
  }, [location.pathname, navigate]);

  const handleSignInClick = () => {
    navigate('/sign-in');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('position');
    setUsername(null);
    setPosition(null);
    navigate('/sign-in');
  };

  return (
    <HeaderWrapper>
      <Link to="/">
        <Title>
          <h1>BIO FOODS</h1>
        </Title>
      </Link>
      <RightSection>
        {username ? (
          <>
            <div style={{ color: 'white' }}>Welcome, {username} ({position})!</div>
            <NotificationIcon to="/notifications">
              <FaBell style={{ fontSize: '24px' }} />
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </NotificationIcon>
            <Button as="button" onClick={handleLogout}>
              Logout
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </Button>
          </>
        ) : (
          <>
            <Button to="/">
              Home
              <div className="arrow-wrapper"></div>
            </Button>
            <Button as="button" onClick={handleSignInClick}>
              Sign In
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </Button>
            <Button to="/contact">
              Contact Us
              <div className="arrow-wrapper"></div>
            </Button>
          </>
        )}
      </RightSection>
    </HeaderWrapper>
  );
};

export default Header;
