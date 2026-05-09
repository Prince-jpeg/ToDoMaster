import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// Compresses any image to under ~100KB as base64
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 400; // max width/height in px
        let { width, height } = img;
        if (width > height) {
          if (width > MAX) { height = (height * MAX) / width; width = MAX; }
        } else {
          if (height > MAX) { width = (width * MAX) / height; height = MAX; }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // 70% quality JPEG
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
};

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const fileInputRef = useRef();
  const [editing, setEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [photoBase64, setPhotoBase64] = useState(user.photoUrl || '');
  const [tempPhoto, setTempPhoto] = useState(user.photoUrl || '');
  const [form, setForm] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const initial = (form.fullName || 'U')[0].toUpperCase();
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Now compresses before setting tempPhoto
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 21 * 1024 * 1024) {
      setError('Photo must be less than 21MB.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const compressed = await compressImage(file);
      setTempPhoto(compressed);
    } catch {
      setError('Failed to process image. Please try another.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    setTempPhoto('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditStart = () => {
    setTempPhoto(photoBase64);
    setEditing(true);
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setTempPhoto(photoBase64);
    setEditing(false);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await api.put(`/profile/${user.id}`, {
        fullName: form.fullName,
        email: form.email,
        photoUrl: tempPhoto || null,
        ...(form.newPassword ? { password: form.newPassword } : {}),
      });
      setPhotoBase64(tempPhoto);
      const updated = { ...user, fullName: form.fullName, email: form.email, photoUrl: tempPhoto };
      localStorage.setItem('user', JSON.stringify(updated));
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setForm(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const page = { minHeight: '100vh', backgroundColor: '#faf7f2', fontFamily: 'Georgia, serif' };
  const nav = { display: 'flex', alignItems: 'center', padding: '16px 40px', backgroundColor: '#faf7f2' };
  const backBtn = { background: 'none', border: 'none', color: '#d4694a', fontSize: '15px', fontWeight: '600', cursor: 'pointer', padding: 0, fontFamily: 'Georgia, serif' };
  const content = { maxWidth: '520px', margin: '20px auto', padding: '0 24px' };
  const card = { backgroundColor: '#fff', borderRadius: '16px', padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' };
  const avatarWrap = { display: 'flex', justifyContent: 'center', marginBottom: '8px' };
  const avatarStyle = { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#d4694a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', overflow: 'hidden', border: '3px solid #f0ebe3', cursor: editing ? 'pointer' : 'default' };
  const avatarImg = { width: '100%', height: '100%', objectFit: 'cover' };
  const photoActions = { display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' };
  const changePhotoBtn = { background: 'none', border: 'none', color: '#d4694a', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Georgia, serif', textDecoration: 'underline' };
  const removePhotoBtn = { background: 'none', border: 'none', color: '#c0392b', fontSize: '12px', cursor: 'pointer', fontFamily: 'Georgia, serif', textDecoration: 'underline' };
  const nameTitle = { textAlign: 'center', fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' };
  const roleText = { textAlign: 'center', color: '#aaa', fontSize: '13px', marginBottom: '28px' };
  const divider = { borderBottom: '1px solid #f0ebe3', marginBottom: '24px' };
  const sectionTitle = { fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' };
  const label = { display: 'block', fontSize: '11px', fontWeight: '600', color: '#888', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '6px' };
  const input = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e8e2d9', backgroundColor: '#faf7f2', fontSize: '14px', color: '#333', outline: 'none', boxSizing: 'border-box', marginBottom: '18px', fontFamily: 'Georgia, serif' };
  const inputDisabled = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #f0ebe3', backgroundColor: '#faf7f2', fontSize: '14px', color: '#999', outline: 'none', boxSizing: 'border-box', marginBottom: '18px' };
  const btnRow = { display: 'flex', gap: '12px', marginTop: '8px' };
  const primaryBtn = { flex: 1, padding: '13px', backgroundColor: '#d4694a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Georgia, serif' };
  const secondaryBtn = { flex: 1, padding: '13px', backgroundColor: '#f5ede4', color: '#555', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Georgia, serif' };
  const errorBox = { backgroundColor: '#fde8e3', color: '#c0392b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' };
  const successBox = { backgroundColor: '#e3f9e5', color: '#1a7431', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' };
  const overlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
  const modal = { backgroundColor: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '320px', width: '90%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' };
  const modalTitle = { fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' };
  const modalText = { fontSize: '14px', color: '#888', marginBottom: '24px' };
  const modalBtnRow = { display: 'flex', gap: '12px' };

  return (
    <div style={page}>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />

      {showLogoutConfirm && (
        <div style={overlay}>
          <div style={modal}>
            <div style={modalTitle}>Log Out</div>
            <p style={modalText}>Are you sure you want to log out?</p>
            <div style={modalBtnRow}>
              <button style={secondaryBtn} onClick={() => setShowLogoutConfirm(false)}>No, Stay</button>
              <button style={primaryBtn} onClick={handleLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      <nav style={nav}>
        <button style={backBtn} onClick={() => editing ? handleCancelEdit() : navigate('/dashboard')}>
          ← {editing ? 'Cancel' : 'ToDoMaster'}
        </button>
      </nav>

      <div style={content}>
        <div style={card}>
          <div style={avatarWrap}>
            <div
              style={avatarStyle}
              onClick={() => editing && fileInputRef.current.click()}
              title={editing ? 'Click to change photo' : ''}
            >
              {(editing ? tempPhoto : photoBase64)
                ? <img src={editing ? tempPhoto : photoBase64} alt="Profile" style={avatarImg} />
                : initial
              }
            </div>
          </div>

          {editing && (
            <div style={photoActions}>
              <button style={changePhotoBtn} onClick={() => fileInputRef.current.click()}>
                {tempPhoto ? 'Change Photo' : 'Add Photo'}
              </button>
              {tempPhoto && (
                <button style={removePhotoBtn} onClick={handleRemovePhoto}>Remove</button>
              )}
            </div>
          )}

          {/* ✅ Shows compressing indicator */}
          {loading && editing && !form.newPassword && (
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
              Processing image...
            </p>
          )}

          {!editing && <div style={{ marginBottom: '16px' }} />}

          <h2 style={nameTitle}>{editing ? 'Edit Profile' : form.fullName}</h2>
          <p style={roleText}>{editing ? 'Update your account details' : 'Student Account'}</p>
          <div style={divider} />
          <div style={sectionTitle}>Account Information</div>

          {error && <div style={errorBox}>{error}</div>}
          {success && !editing && <div style={successBox}>{success}</div>}

          <label style={label}>Full Name</label>
          <input style={editing ? input : inputDisabled} type="text" name="fullName" value={form.fullName} onChange={onChange} disabled={!editing} />

          <label style={label}>Email</label>
          <input style={editing ? input : inputDisabled} type="email" name="email" value={form.email} onChange={onChange} disabled={!editing} />

          {editing ? (
            <>
              <label style={label}>New Password (Optional)</label>
              <input style={input} type="password" name="newPassword" placeholder="Leave blank to keep current" value={form.newPassword} onChange={onChange} />
              <label style={label}>Confirm New Password</label>
              <input style={input} type="password" name="confirmPassword" placeholder="Confirm new password" value={form.confirmPassword} onChange={onChange} />
            </>
          ) : (
            <>
              <label style={label}>Password</label>
              <input style={inputDisabled} type="password" value="••••••••" disabled />
            </>
          )}

          <div style={divider} />
          <div style={btnRow}>
            {editing ? (
              <>
                <button style={secondaryBtn} onClick={handleCancelEdit}>Cancel</button>
                <button style={primaryBtn} onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                <button style={primaryBtn} onClick={handleEditStart}>Edit Profile</button>
                <button style={secondaryBtn} onClick={() => setShowLogoutConfirm(true)}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}