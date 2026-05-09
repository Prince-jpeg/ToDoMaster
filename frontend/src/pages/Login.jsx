import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/login', form);
      const profileRes = await api.get(`/profile/by-email?email=${form.email}`);
      localStorage.setItem('user', JSON.stringify({
        id: profileRes.data.id,
        email: form.email,
        fullName: profileRes.data.fullName,
        photoUrl: profileRes.data.photoUrl || '',
      }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Login failed. Check your credentials.');
    } finally { setLoading(false); }
  };

  const page = { minHeight: '100vh', backgroundColor: '#faf7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif' };
  const card = { backgroundColor: '#fff', borderRadius: '16px', padding: '48px 40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' };
  const title = { textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#d4694a', marginBottom: '6px' };
  const subtitle = { textAlign: 'center', color: '#999', fontSize: '14px', marginBottom: '32px' };
  const label = { display: 'block', fontSize: '11px', fontWeight: '600', color: '#888', marginBottom: '6px', letterSpacing: '0.8px', textTransform: 'uppercase' };
  const input = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e8e2d9', backgroundColor: '#faf7f2', fontSize: '14px', color: '#333', outline: 'none', boxSizing: 'border-box', marginBottom: '16px', fontFamily: 'Georgia, serif' };
  const btn = { width: '100%', padding: '14px', backgroundColor: '#d4694a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px', fontFamily: 'Georgia, serif' };
  const footer = { textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' };
  const link = { color: '#d4694a', textDecoration: 'none', fontWeight: '600' };
  const errorBox = { backgroundColor: '#fde8e3', color: '#c0392b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>ToDoMaster</h1>
        <p style={subtitle}>Stay organized, stay focused</p>
        {error && <div style={errorBox}>{error}</div>}
        <label style={label}>Email</label>
        <input style={input} type="email" name="email" placeholder="you@university.edu" value={form.email} onChange={onChange} />
        <label style={label}>Password</label>
        <input style={input} type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} />
        <button style={btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={footer}>Don't have an account? <Link to="/register" style={link}>Create one</Link></p>
      </div>
    </div>
  );
}