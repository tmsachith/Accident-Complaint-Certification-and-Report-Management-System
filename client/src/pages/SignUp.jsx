import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Addusers from '../components/adduser';
import './SignUp.css';

const signup = () => {
  const username = localStorage.getItem('username') || 'Guest';

  return (
    <div className="signup">
      
      <div className="signup-main">
        <Sidebar />
        <Addusers />
      </div>
    </div>
  );
};

export default signup;














// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './signup.css'; // Make sure to create this CSS file

// const signup = () => {
//   const navigate = useNavigate();
//   const username = localStorage.getItem('username') || 'Guest';

//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     navigate('/sign-in');
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-header">
//         <h1>Welcome, {username}!</h1>
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </div>
//       <div className="signup-content">
//         <p>This is your signup. You can add more components and content here.</p>
//       </div>
//     </div>
//   );
// };

// export default signup;
