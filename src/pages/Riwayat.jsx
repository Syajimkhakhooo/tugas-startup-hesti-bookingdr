import React, { useState } from 'react';
import { 
  Clock3, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Building2, 
  FileText,
  CalendarPlus
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Riwayat({ appointments, onNavigateToBooking }) {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = appointments.filter((app) => {
    const matchStatus = 
      filterStatus === 'Semua' 
        ? true 
        : filterStatus === 'Menunggu' 
          ? (app.status === 'Menunggu' || app.status === 'Menunggu Konfirmasi')
          : app.status === filterStatus;

    const query = searchQuery.toLowerCase();
    const matchQuery = 
      app.doctorName.toLowerCase().includes(query) ||
      app.id.toLowerCase().includes(query) ||
      (app.complaint && app.complaint.toLowerCase().includes(query));

    return matchStatus && matchQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#064e3b' }}>
            Riwayat Janji Temu Pasien
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Daftar seluruh jadwal kunjungan dan reservasi dokter yang telah dibuat.
          </p>
        </div>

        <button 
          onClick={onNavigateToBooking} 
          className="btn-primary" 
          style={{ fontSize: '0.9rem' }}
        >
          <CalendarPlus size={18} />
          Booking Janji Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Cari nama dokter atau keluhan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '38px', paddingRight: '12px', fontSize: '0.88rem' }}
          />
          <Search 
            size={17} 
            color="#64748b" 
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
          />
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Semua', 'Menunggu', 'Selesai'].map((status) => {
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: isActive ? '1.5px solid #059669' : '1px solid #e2e8f0',
                  background: isActive ? '#ecfdf5' : '#ffffff',
                  color: isActive ? '#065f46' : '#64748b',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {status}
              </button>
            );
          })}
        </div>

      </div>

      {/* Appointment List / Table */}
      {filteredAppointments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Clock3 size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <h4 style={{ color: '#334155', fontSize: '1rem', marginBottom: '4px' }}>
            Tidak ada riwayat booking ditemukan
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Cobalah ubah filter status atau kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    No. Booking
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Dokter & Spesialisasi
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Tanggal
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Jam
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Keluhan Pasien
                  </th>
                  <th style={{ padding: '14px 18px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app, index) => (
                  <tr 
                    key={app.id || index}
                    style={{ 
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background 0.15s ease',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafcfb'
                    }}
                  >
                    <td style={{ padding: '16px 18px', fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>
                      {app.id}
                    </td>
                    <td style={{ padding: '16px 18px' }}>
                      <strong style={{ color: '#0f172a', fontSize: '0.9rem', display: 'block' }}>
                        {app.doctorName}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                        {app.doctorSpecialty}
                      </span>
                    </td>
                    <td style={{ padding: '16px 18px', fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                      {app.date}
                    </td>
                    <td style={{ padding: '16px 18px', fontSize: '0.88rem', color: '#059669', fontWeight: 700 }}>
                      {app.time} WIB
                    </td>
                    <td style={{ padding: '16px 18px', fontSize: '0.82rem', color: '#64748b', maxWidth: '240px' }}>
                      {app.complaint || '-'}
                    </td>
                    <td style={{ padding: '16px 18px' }}>
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
