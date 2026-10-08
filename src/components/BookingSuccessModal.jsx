import React from 'react';
import { CheckCircle2, Calendar, Clock, User, FileText, ArrowRight, Home } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function BookingSuccessModal({ booking, onClose, onGoToRiwayat, onGoToDashboard }) {
  if (!booking) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '480px', textAlign: 'center', padding: '32px 24px' }}>
        
        {/* Success Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#d1fae5',
          color: '#059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 0 0 8px #ecfdf5'
        }}>
          <CheckCircle2 size={42} strokeWidth={2.3} />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#064e3b', marginBottom: '6px' }}>
          Booking Berhasil!
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '22px' }}>
          Jadwal konsultasi rekam medis Anda telah terdaftar dalam sistem klinik kami.
        </p>

        {/* Booking Card Details */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'left',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '12px',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Nomor Booking</span>
            <span style={{ 
              fontWeight: 800, 
              color: '#059669', 
              fontSize: '1.05rem', 
              letterSpacing: '0.5px',
              background: '#ecfdf5',
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid #a7f3d0'
            }}>
              {booking.id}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={16} color="#059669" />
              <div>
                <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block' }}>Dokter Pemeriksa</span>
                <strong style={{ color: '#0f172a' }}>{booking.doctorName}</strong>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#059669' }}>{booking.doctorSpecialty}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#059669" />
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block' }}>Tanggal</span>
                  <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>{booking.date}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#059669" />
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block' }}>Jam Praktek</span>
                  <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>{booking.time} WIB</strong>
                </div>
              </div>
            </div>

            {booking.complaint && (
              <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '10px', marginTop: '2px' }}>
                <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block' }}>Keluhan:</span>
                <p style={{ color: '#334155', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '2px' }}>
                  "{booking.complaint}"
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Status Jadwal</span>
              <StatusBadge status={booking.status || 'Menunggu Konfirmasi'} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={onGoToDashboard} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            <Home size={18} />
            Kembali ke Dashboard
          </button>
          <button 
            onClick={onGoToRiwayat} 
            className="btn-secondary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            Lihat Riwayat Booking
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
