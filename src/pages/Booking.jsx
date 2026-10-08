import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  FileEdit, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Check,
  Building,
  Info
} from 'lucide-react';

const ALL_TIME_SLOTS = [
  '08:00',
  '09:00',
  '10:00',
  '13:00',
  '14:00',
  '15:00'
];

export default function Booking({ 
  doctors, 
  appointments, 
  preSelectedDoctor, 
  onBookingSubmit, 
  user 
}) {
  // Step / Form States
  const [selectedDoctorId, setSelectedDoctorId] = useState(preSelectedDoctor?.id || doctors[0]?.id || '');
  
  // Default date: tomorrow or today
  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTomorrowDateString());
  const [selectedTime, setSelectedTime] = useState('');
  const [complaint, setComplaint] = useState('');
  const [validationError, setValidationError] = useState('');

  const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);

  // Check which time slots are already booked for this doctor on this date
  const bookedSlots = appointments
    .filter(app => app.doctorId === selectedDoctorId && app.date === selectedDate && app.status !== 'Dibatalkan')
    .map(app => app.time);

  const handleSelectTime = (time) => {
    if (bookedSlots.includes(time)) return;
    setSelectedTime(time);
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      setValidationError('Silakan pilih dokter terlebih dahulu.');
      return;
    }
    if (!selectedDate) {
      setValidationError('Silakan pilih tanggal konsultasi.');
      return;
    }
    if (!selectedTime) {
      setValidationError('Silakan pilih salah satu jam konsultasi yang tersedia.');
      return;
    }
    if (!complaint.trim()) {
      setValidationError('Silakan tuliskan keluhan atau tujuan konsultasi Anda.');
      return;
    }

    // Generate new booking ID: APT-00X
    const newIdNumber = appointments.length + 1;
    const formattedId = `APT-${String(newIdNumber).padStart(3, '0')}`;

    const newBookingData = {
      id: formattedId,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorClinic: selectedDoctor.clinic,
      patientName: user?.name || 'Hesti',
      date: selectedDate,
      time: selectedTime,
      complaint: complaint.trim(),
      status: 'Menunggu',
      room: selectedDoctor.room,
      createdAt: new Date().toISOString()
    };

    onBookingSubmit(newBookingData);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Page Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#064e3b' }}>
          Formulir Booking Janji Temu
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
          Lengkapi tahapan pendaftaran di bawah ini untuk mendapatkan nomor antrean dokter.
        </p>
      </div>

      {validationError && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#b91c1c',
          borderRadius: '12px',
          padding: '12px 16px',
          marginBottom: '20px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={18} />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* ================= STEP 1: PILIH DOKTER ================= */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>1</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Pilih Dokter Spesialis
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '14px'
          }}>
            {doctors.map((doctor) => {
              const isSelected = doctor.id === selectedDoctorId;
              const isBeauty = doctor.specialty.toLowerCase().includes('kulit') || doctor.specialty.toLowerCase().includes('kecantikan');

              return (
                <div
                  key={doctor.id}
                  onClick={() => {
                    setSelectedDoctorId(doctor.id);
                    setSelectedTime(''); // reset time if doctor changed
                  }}
                  style={{
                    border: isSelected ? '2px solid #059669' : '1.5px solid #e2e8f0',
                    background: isSelected ? '#ecfdf5' : '#ffffff',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(5, 150, 105, 0.15)' : 'none'
                  }}
                >
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: isSelected ? '2.5px solid #059669' : '2px solid #e2e8f0'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                        {doctor.name}
                      </h4>
                    </div>
                    <div style={{ 
                      fontSize: '0.78rem', 
                      color: isBeauty ? '#047857' : '#059669', 
                      fontWeight: 600,
                      marginTop: '2px'
                    }}>
                      {doctor.specialty}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                      {doctor.scheduleDays} ({doctor.scheduleHours} WIB)
                    </div>
                  </div>

                  {isSelected && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={15} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= STEP 2: PILIH TANGGAL & JAM ================= */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>2</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Pilih Tanggal & Jam Kunjungan
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Input Tanggal */}
            <div>
              <label className="form-label" htmlFor="date-input">
                Tanggal Janji Temu
              </label>
              <input
                id="date-input"
                type="date"
                required
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime('');
                }}
                className="form-input"
                style={{ fontSize: '0.95rem' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Pilih tanggal praktek dokter yang tersedia
              </span>
            </div>

            {/* Pilihan Jam */}
            <div>
              <label className="form-label">
                Pilih Jam Konsultasi
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {ALL_TIME_SLOTS.map((time) => {
                  const isBooked = bookedSlots.includes(time);
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isBooked}
                      onClick={() => handleSelectTime(time)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: isSelected 
                          ? '2px solid #059669' 
                          : isBooked 
                            ? '1.5px solid #e2e8f0' 
                            : '1.5px solid #cbd5e1',
                        background: isSelected 
                          ? '#059669' 
                          : isBooked 
                            ? '#f1f5f9' 
                            : '#ffffff',
                        color: isSelected 
                          ? '#ffffff' 
                          : isBooked 
                            ? '#94a3b8' 
                            : '#0f172a',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      {time}
                      {isBooked && (
                        <span style={{
                          display: 'block',
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          color: '#ef4444',
                          marginTop: '2px'
                        }}>
                          Penuh
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
                * Jam yang telah dibooking pasien lain otomatis disabled / tidak dapat dipilih.
              </span>
            </div>
          </div>
        </div>

        {/* ================= STEP 3: KELUHAN ================= */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>3</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Keluhan Pasien
            </h3>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="complaint-input">
              Tuliskan keluhan atau gejala yang Anda rasakan:
            </label>
            <textarea
              id="complaint-input"
              rows={3}
              required
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Tuliskan keluhan Anda... (misal: Sakit kepala 2 hari berturut-turut, atau ingin konsultasi treatment kulit jerawat)"
              className="form-textarea"
            />
          </div>
        </div>

        {/* ================= STEP 4: RINGKASAN & KONFIRMASI ================= */}
        <div className="card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
          border: '2px solid #a7f3d0'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#064e3b', marginBottom: '14px' }}>
            Ringkasan Konfirmasi Booking
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #d1fae5',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Pasien</span>
              <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{user?.name || 'Hesti'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Dokter</span>
              <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{selectedDoctor?.name || '-'}</strong>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#059669' }}>{selectedDoctor?.specialty}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Tanggal</span>
              <strong style={{ color: '#0f172a', fontSize: '0.92rem' }}>{selectedDate || '-'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Jam</span>
              <strong style={{ color: '#059669', fontSize: '0.95rem' }}>
                {selectedTime ? `${selectedTime} WIB` : 'Belum dipilih'}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}
            >
              <CheckCircle2 size={20} />
              Booking Sekarang
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
