import React from 'react';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  Clock3, 
  FileText, 
  UserCircle2, 
  LogOut, 
  Activity,
  HeartPulse,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'booking', label: 'Booking Janji Temu', icon: CalendarPlus },
    { id: 'riwayat', label: 'Riwayat Booking', icon: Clock3 },
    { id: 'rekammedis', label: 'Rekam Medis', icon: FileText },
    { id: 'profil', label: 'Profil Pasien', icon: UserCircle2 },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-icon-wrapper">
            <HeartPulse size={24} />
          </div>
          <div>
            <h1 className="brand-title">Klinik Sehat</h1>
            <span className="brand-sub">Medika Digital</span>
          </div>
          {setIsOpen && (
            <button 
              className="mobile-close-btn"
              onClick={() => setIsOpen(false)}
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: isOpen ? 'block' : 'none'
              }}
            >
              <X size={20} color="#64748b" />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '6px 14px' }}>
            Menu Utama
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={19} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-badge-card">
            <div className="user-avatar-circle">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'H'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'Hesti'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'hesti@gmail.com'}
              </div>
            </div>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={16} />
            Keluar (Logout)
          </button>
        </div>
      </aside>
    </>
  );
}
