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
import Settings from './pages/Settings';
import CertificateChanges from './pages/CertificateChanges';
import AnnouncementPage from './pages/AnnouncementPage';
import CertificateChangeShow from './pages/CertificateChangeShow';
import Report from './pages/Report';
import AddComplaint from './pages/AddComplaint';
import ComplaintDetailsShow from './pages/ComplaintDetailsShow'; // Import the component

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
      {loading && <Loader />}
      {!loading && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accidents" element={<Accidents />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/add-accident" element={<AddAccident />} />
            <Route path="/accident-show/:id" element={<Accidentshow />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/certificate-changes" element={<CertificateChanges />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/certificate-change-show/:id" element={<CertificateChangeShow />} />
            <Route path="/report" element={<Report />} />
            <Route path="/add-complaint" element={<AddComplaint />} />
            <Route path="/complaint-details/:id" element={<ComplaintDetailsShow />} /> {/* New route */}
          </Routes>
        </>
      )}
    </>
  );
};

export default AppContent;