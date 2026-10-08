import React from 'react';
import { 
  UserCircle2, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Droplet, 
  AlertTriangle,
  Award,
  CreditCard
} from 'lucide-react';

export default function Profil({ user }) {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="card" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        color: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#ffffff',
          color: '#059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 800,
          border: '4px solid #a7f3d0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {user?.name ? user.name.charAt(0) : 'H'}
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>
            <ShieldCheck size={14} />
            Pasien Terverifikasi
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.2 }}>
            {user?.name || 'Hesti'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.88rem', color: '#ecfdf5' }}>
            <span>No. RM: <strong>RM-2026-0891</strong></span>
            <span>•</span>
            <span>NIK: <strong>3201089201940003</strong></span>
          </div>
        </div>
      </div>

      {/* Detail Informasi Pasien */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        
        {/* Kontak & Akun */}
        <div className="card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#064e3b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCircle2 size={18} color="#059669" />
            Informasi Kontak & Akun
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} color="#059669" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Email Terdaftar</span>
                <strong>{user?.email || 'hesti@gmail.com'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={16} color="#059669" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Nomor Telepon / WhatsApp</span>
                <strong>+62 812-3456-7890</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="#059669" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Alamat Domisili</span>
                <span>Jl. Cendrawasih No. 45, Jakarta Selatan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Medis Personal */}
        <div className="card" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#064e3b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="#059669" />
            Data Faskes & Medis
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Droplet size={16} color="#dc2626" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Golongan Darah</span>
                <strong>O (Rhesus Positif)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={16} color="#059669" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Tanggal Lahir</span>
                <strong>14 Agustus 2002 (24 Tahun)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={16} color="#d97706" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Riwayat Alergi</span>
                <span style={{ color: '#b45309', fontWeight: 600 }}>Udang (Seafood ringan) & Udara Dingin</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
