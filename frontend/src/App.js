import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // on first load redirect to login
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ maxWidth: 800, margin: '20px auto' }}>
        <Routes>
          <Route path="/" element={<Feed user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
