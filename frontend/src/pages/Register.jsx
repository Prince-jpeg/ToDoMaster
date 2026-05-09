import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:'', email:'', password:'', confirm:'' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await api.post('/auth/register', { fullName: form.fullName, email: form.email, password: form.password });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Registration failed.');
    } finally { setLoading(false); }
  };

  const page = { minHeight:'100vh', backgroundColor:'#faf7f2', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"Georgia, serif" };
  const card = { backgroundColor:'#fff', borderRadius:'16px', padding:'48px 40px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' };
  const title = { textAlign:'center', fontSize:'32px', fontWeight:'bold', color:'#d4694a', marginBottom:'6px' };
  const subtitle = { textAlign:'center', color:'#999', fontSize:'14px', marginBottom:'32px' };
  const label = { display:'block', fontSize:'11px', fontWeight:'600', color:'#888', marginBottom:'6px', letterSpacing:'0.8px', textTransform:'uppercase' };
  const input = { width:'100%', padding:'12px 14px', borderRadius:'8px', border:'1.5px solid #e8e2d9', backgroundColor:'#faf7f2', fontSize:'14px', color:'#333', outline:'none', boxSizing:'border-box', marginBottom:'16px' };
  const btn = { width:'100%', padding:'14px', backgroundColor:'#d4694a', color:'#fff', border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:'600', cursor:'pointer', marginTop:'8px' };
  const footer = { textAlign:'center', marginTop:'20px', fontSize:'13px', color:'#888' };
  const link = { color:'#d4694a', textDecoration:'none', fontWeight:'600' };
  const errorBox = { backgroundColor:'#fde8e3', color:'#c0392b', padding:'10px 14px', borderRadius:'8px', fontSize:'13px', marginBottom:'16px' };
  const successBox = { backgroundColor:'#e3f9e5', color:'#1a7431', padding:'10px 14px', borderRadius:'8px', fontSize:'13px', marginBottom:'16px' };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>ToDoMaster</h1>
        <p style={subtitle}>Create your account</p>
        {error && <div style={errorBox}>{error}</div>}
        {success && <div style={successBox}>{success}</div>}
        <label style={label}>Full Name</label>
        <input style={input} type="text" name="fullName" placeholder="John Doe" value={form.fullName} onChange={onChange} />
        <label style={label}>Email</label>
        <input style={input} type="email" name="email" placeholder="you@university.edu" value={form.email} onChange={onChange} />
        <label style={label}>Password</label>
        <input style={input} type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} />
        <label style={label}>Confirm Password</label>
        <input style={input} type="password" name="confirm" placeholder="••••••••" value={form.confirm} onChange={onChange} />
        <button style={btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p style={footer}>Already have an account? <Link to="/login" style={link}>Login</Link></p>
      </div>
    </div>
  );
}