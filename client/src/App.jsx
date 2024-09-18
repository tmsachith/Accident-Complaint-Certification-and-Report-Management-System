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
import Loader from './components/Loader';
import NotificationPage from './pages/NotificationPage';
import AddAccident from './pages/Addaccident';
import Accidentshow from './pages/Accidentshow';
import Settings from './pages/Settings'; // Import the Settings page

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStartLoading = () => {
      setLoading(true);
    };

    const handleStopLoading = () => {
      setLoading(false);
    };

    handleStartLoading();

    const loadingTimeout = setTimeout(handleStopLoading, 1190);

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
            <Route path="/add-accident" element={<AddAccident />} /> {/* AddAccident route */}
            <Route path="/accident-show/:id" element={<Accidentshow />} /> {/* Accidentshow route */}
            <Route path="/settings" element={<Settings />} /> {/* Settings route */}
          </Routes>
        </>
      )}
    </>
  );
};

export default AppContent;
