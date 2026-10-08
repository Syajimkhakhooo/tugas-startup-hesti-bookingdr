import React from 'react';
import { Menu, Calendar, ShieldCheck, Bell } from 'lucide-react';

export default function Topbar({ onMenuClick, activeTab, user }) {
  const getTabTitle = (tab) => {
    switch(tab) {
      case 'dashboard': return 'Dashboard Pasien';
      case 'booking': return 'Pendaftaran & Buat Janji Temu';
      case 'riwayat': return 'Riwayat Kunjungan & Janji Temu';
      case 'rekammedis': return 'Rekam Medis Elektronik (RME)';
      case 'profil': return 'Informasi Profil Pasien';
      default: return 'Klinik Sehat Medika';
    }
  };

  const todayFormatted = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className="mobile-menu-trigger" 
          onClick={onMenuClick} 
          aria-label="Buka Menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#064e3b' }}>
            {getTabTitle(activeTab)}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b' }}>
            <Calendar size={13} color="#059669" />
            <span>{todayFormatted}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          background: '#ecfdf5', 
          border: '1px solid #a7f3d0', 
          padding: '6px 12px', 
          borderRadius: '9999px',
          color: '#065f46',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          <ShieldCheck size={15} color="#059669" />
          <span className="hide-on-mobile">Rekam Medis Terverifikasi</span>
        </div>
      </div>
    </header>
  );
}
