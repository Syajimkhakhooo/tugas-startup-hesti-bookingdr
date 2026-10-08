import React from 'react';
import { 
  CalendarPlus, 
  CalendarCheck, 
  FileText, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  MapPin, 
  Stethoscope, 
  CheckCircle,
  Building2
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard({ 
  user, 
  appointments, 
  medicalRecords, 
  doctors, 
  onNavigateToBooking, 
  onSelectDoctorToBook,
  onNavigateToRiwayat,
  onNavigateToRecords
}) {
  // Find next upcoming appointment (status: Menunggu)
  const nextAppointment = appointments.find(a => a.status === 'Menunggu' || a.status === 'Menunggu Konfirmasi');
  const completedVisitsCount = appointments.filter(a => a.status === 'Selesai').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Banner Sapaan Pengguna */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #059669 60%, #10b981 100%)',
        borderRadius: '20px',
        padding: '28px 24px',
        color: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.25)'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'rgba(255, 255, 255, 0.18)', 
            padding: '4px 12px', 
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '10px'
          }}>
            <Sparkles size={14} />
            Layanan Rawat Jalan & Konsultasi Digital
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.3px' }}>
            Halo, {user?.name || 'Hesti'}! 👋
          </h2>
          <p style={{ color: '#d1fae5', fontSize: '0.94rem', lineHeight: 1.5 }}>
            Selamat datang di sistem rekam medis & reservasi jadwal dokter. Anda dapat membuat janji temu baru atau melihat riwayat diagnosis secara online dengan mudah.
          </p>
        </div>

        <button 
          onClick={onNavigateToBooking} 
          style={{
            background: '#ffffff',
            color: '#065f46',
            fontWeight: 700,
            fontSize: '0.94rem',
            padding: '13px 24px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease'
          }}
        >
          <CalendarPlus size={19} color="#059669" />
          Buat Janji Temu Sekarang
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        
        {/* Stat 1: Janji Temu Aktif */}
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clock size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Janji Temu Aktif</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              {appointments.filter(a => a.status === 'Menunggu').length}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600 }}>Menunggu konsultasi</span>
          </div>
        </div>

        {/* Stat 2: Kunjungan Selesai */}
        <div 
          className="card" 
          onClick={onNavigateToRiwayat}
          style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#f0fdf4',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CalendarCheck size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Kunjungan Selesai</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              {completedVisitsCount}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Total riwayat janji</span>
          </div>
          <ChevronRight size={18} color="#94a3b8" />
        </div>

        {/* Stat 3: Berkas Rekam Medis */}
        <div 
          className="card" 
          onClick={onNavigateToRecords}
          style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#eff6ff',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Rekam Medis Digital</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              {medicalRecords.length}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: 600 }}>Tercatat di sistem</span>
          </div>
          <ChevronRight size={18} color="#94a3b8" />
        </div>

      </div>

      {/* Janji Temu Berikutnya (Next Appointment Card) */}
      <div className="card" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={19} color="#059669" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              Janji Temu Berikutnya
            </h3>
          </div>
          <button 
            onClick={onNavigateToRiwayat}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#059669', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Lihat Semua Riwayat
            <ArrowRight size={14} />
          </button>
        </div>

        {nextAppointment ? (
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: '1.5px solid #a7f3d0',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #a7f3d0',
                borderRadius: '12px',
                padding: '10px 16px',
                textAlign: 'center',
                minWidth: '85px'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>Tanggal</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b' }}>
                  {nextAppointment.date.split('-')[2]}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Bln {nextAppointment.date.split('-')[1]}
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                    {nextAppointment.id}
                  </span>
                  <StatusBadge status={nextAppointment.status} />
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                  {nextAppointment.doctorName}
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
                  {nextAppointment.doctorSpecialty}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                  Pukul {nextAppointment.time} WIB • {nextAppointment.room}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onNavigateToRiwayat}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '9px 16px' }}
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '30px 16px', 
            background: '#f8fafc', 
            borderRadius: '14px',
            border: '1px dashed #cbd5e1'
          }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>
              Tidak ada jadwal janji temu aktif saat ini.
            </p>
            <button onClick={onNavigateToBooking} className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
              <CalendarPlus size={16} />
              Buat Janji Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Daftar Dokter yang Tersedia */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#064e3b' }}>
              Daftar Dokter Tersedia
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Pilih dokter spesialis terbaik untuk konsultasi medis Anda
            </p>
          </div>
          <button
            onClick={onNavigateToBooking}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Lihat Formulir Booking
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '18px' }}>
          {doctors.map((doctor) => {
            const isBeautyDoctor = doctor.specialty.toLowerCase().includes('kulit') || doctor.specialty.toLowerCase().includes('kecantikan');

            return (
              <div 
                key={doctor.id} 
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: isBeautyDoctor ? '2px solid #a7f3d0' : '1px solid var(--border-color)',
                  background: isBeautyDoctor ? 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' : '#ffffff'
                }}
              >
                {isBeautyDoctor && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sparkles size={11} />
                    Dokter Kecantikan
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2.5px solid #10b981'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                      {doctor.name}
                    </h4>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: isBeautyDoctor ? '#047857' : '#059669', 
                      fontWeight: 600,
                      display: 'block',
                      marginTop: '2px'
                    }}>
                      {doctor.specialty}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {doctor.clinic}
                    </span>
                  </div>
                </div>

                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '10px', 
                  padding: '10px', 
                  fontSize: '0.78rem', 
                  color: '#475569',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Jadwal:</span>
                    <strong style={{ color: '#0f172a' }}>{doctor.scheduleDays}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Jam Praktek:</span>
                    <strong style={{ color: '#059669' }}>{doctor.scheduleHours} WIB</strong>
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={() => onSelectDoctorToBook(doctor)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px' }}
                  >
                    <CalendarPlus size={16} />
                    Pilih & Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
