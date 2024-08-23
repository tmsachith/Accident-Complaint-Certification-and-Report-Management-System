import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Accidents from './pages/Accidents';
import Complaints from './pages/Complaints';
import Loader from './components/Loader'; // Ensure you have this component
import NotificationPage from './pages/NotificationPage'; // Import NotificationPage

// Main App component
function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Function to start loading
    const handleStartLoading = () => {
      setLoading(true);
    };

    // Function to stop loading
    const handleStopLoading = () => {
      setLoading(false);
    };

    // Start loading when location changes
    handleStartLoading();

    // Simulate loading duration, you can adjust this as needed
    const loadingTimeout = setTimeout(handleStopLoading, 1190);

    // Cleanup the timeout when component unmounts or location changes
    return () => clearTimeout(loadingTimeout);
  }, [location]);

  return (
    <>
      {loading && <Loader />} {/* Render Loader component when loading */}
      {!loading && (
        <>
          <Header /> {/* Render Header component */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home route */}
            <Route path="/sign-in" element={<SignIn />} /> {/* Sign-In route */}
            <Route path="/sign-up" element={<SignUp />} /> {/* Sign-Up route */}
            <Route path="/about" element={<About />} /> {/* About route */}
            <Route path="/profile" element={<Profile />} /> {/* Profile route */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
            <Route path="/accidents" element={<Accidents />} /> {/* Accidents route */}
            <Route path="/complaints" element={<Complaints />} /> {/* Complaints route */}
            <Route path="/notifications" element={<NotificationPage />} /> {/* Notifications route */}
          </Routes>
        </>
      )}
    </>
  );
}

// AppWrapper component to provide BrowserRouter
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
