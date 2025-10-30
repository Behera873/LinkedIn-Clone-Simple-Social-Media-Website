import React, { useState } from 'react';
import { register, login } from '../services/api';

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await login({ email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      } else {
        const res = await register({ name: form.name, email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={submit}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        {!isLogin && <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        <button className="btn" type="submit">{isLogin ? 'Login' : 'Create account'}</button>
        <p className="muted">{isLogin ? 'New here?' : 'Already have account?'}
          <button type="button" className="link-btn" onClick={()=>{setIsLogin(!isLogin); setError('')}}>
            {isLogin ? 'Create account' : 'Login'}
          </button>
        </p>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
