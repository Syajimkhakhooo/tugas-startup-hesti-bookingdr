import React, { useState } from 'react';
import { HeartPulse, Mail, Lock, LogIn, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('hesti@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check dummy account requested by user
    if (email.trim().toLowerCase() === 'hesti@gmail.com' && password === '12345678') {
      onLoginSuccess({
        email: 'hesti@gmail.com',
        name: 'Hesti',
        role: 'Pasien Terdaftar',
        mrn: 'RM-2026-0891'
      });
    } else {
      setError('Email atau password tidak sesuai. Gunakan akun dummy di bawah.');
    }
  };

  const handleFillDemo = () => {
    setEmail('hesti@gmail.com');
    setPassword('12345678');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #e0f2fe 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 40px -10px rgba(5, 150, 105, 0.15)',
        border: '1px solid #d1fae5',
        padding: '36px 30px'
      }}>
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
            marginBottom: '16px'
          }}>
            <HeartPulse size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#064e3b', marginBottom: '4px' }}>
            Klinik Sehat Medika
          </h2>
          <p style={{ color: '#059669', fontSize: '0.88rem', fontWeight: 600 }}>
            Booking Jadwal & Rekam Medis Digital
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '18px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Alamat Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
              <Mail 
                size={18} 
                color="#059669" 
                style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
              <Lock 
                size={18} 
                color="#059669" 
                style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} 
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '8px', fontSize: '0.98rem' }}
          >
            <LogIn size={18} />
            Masuk ke Dashboard
          </button>
        </form>

        {/* Demo Account Box */}
        <div style={{
          marginTop: '24px',
          padding: '14px',
          background: '#f0fdf4',
          borderRadius: '14px',
          border: '1.5px dashed #a7f3d0',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontWeight: 700, color: '#065f46', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={14} color="#059669" />
              Akun Uji Coba (Dummy):
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                background: '#ffffff',
                border: '1px solid #10b981',
                color: '#047857',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Isi Otomatis
            </button>
          </div>
          <div style={{ color: '#334155', lineHeight: 1.6 }}>
            <div>Email: <strong style={{ color: '#0f172a' }}>hesti@gmail.com</strong></div>
            <div>Password: <strong style={{ color: '#0f172a' }}>12345678</strong></div>
            <div>Nama Pasien: <strong style={{ color: '#059669' }}>Hesti</strong></div>
          </div>
        </div>

      </div>
    </div>
  );
}
