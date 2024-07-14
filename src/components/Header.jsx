import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// Styled components for the header

// Wrapper for the entire header, includes a blue gradient background
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Title section
const Title = styled.div`
  h1 {
    margin: 0;
    font-size: 24px;
    color: #ffffff; // White text color for better contrast against the gradient background
    font-weight: bold; // Bold text
  }
`;

// Container for the right section of the header (Home, Sign In and Contact Us)
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

// Styled button
const Button = styled(Link)`
  --primary-color: #645bff;
  --secondary-color: #fff;
  --hover-color: #111;
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

const Header = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/sign-in');
  };

  return (
    <HeaderWrapper>
      <Link to="/">
        <Title>
          <h1>Bio Foods</h1>
        </Title>
      </Link>
      <RightSection>
        <Button to="/">
          Home
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </Button>
        <Button as="button" onClick={handleSignInClick}>
          Sign In
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </Button>
        <Button to="/contact">
          Contact Us
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </Button>
      </RightSection>
    </HeaderWrapper>
  );
}

export default Header;
