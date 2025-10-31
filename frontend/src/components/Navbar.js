import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #0a74cbff', display: 'flex', justifyContent: 'space-between' }}>
      <div><Link to="/">Linkedin Clone</Link></div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
