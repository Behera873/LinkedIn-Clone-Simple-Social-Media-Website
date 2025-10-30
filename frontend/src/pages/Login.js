import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email:'', password:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      const u = res.data.user;
      const normalizedUser = {
      id: u.id || u._id || u._id?.toString(),
      name: u.name,
      email: u.email
    };
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div><input name="email" placeholder="Email" value={form.email} onChange={onChange} required/></div>
        <div><input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required/></div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
