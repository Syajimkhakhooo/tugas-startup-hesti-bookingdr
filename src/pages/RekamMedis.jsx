import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  User, 
  Activity, 
  Pill, 
  ClipboardCheck, 
  Sparkles,
  Search,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export default function RekamMedis({ records, user }) {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredRecords = records.filter(item => {
    const q = searchFilter.toLowerCase();
    return (
      item.doctor.toLowerCase().includes(q) ||
      item.diagnosis.toLowerCase().includes(q) ||
      item.complaint.toLowerCase().includes(q) ||
      item.recordNo.toLowerCase().includes(q)
    );
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
            Rekam Medis Digital
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Riwayat catatan medis, diagnosis dokter, dan resep obat pasien.
          </p>
        </div>

        {/* Patient Identity Capsule */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #a7f3d0',
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Nama Pasien</span>
            <strong style={{ fontSize: '0.9rem', color: '#064e3b' }}>{user?.name || 'Hesti'}</strong>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>No. Rekam Medis</span>
            <strong style={{ fontSize: '0.85rem', color: '#059669' }}>RM-2026-0891</strong>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Search size={18} color="#64748b" />
        <input
          type="text"
          placeholder="Cari berdasarkan dokter, keluhan, atau diagnosa..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="form-input"
          style={{ border: 'none', padding: '6px', fontSize: '0.9rem', outline: 'none' }}
        />
      </div>

      {/* Medical Records Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredRecords.map((record) => {
          const isBeauty = record.specialty?.toLowerCase().includes('kulit') || record.specialty?.toLowerCase().includes('kecantikan');

          return (
            <div 
              key={record.id} 
              className="card"
              style={{
                padding: '24px',
                borderLeft: isBeauty ? '5px solid #10b981' : '5px solid #059669',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Card Top Header */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '10px',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: isBeauty ? '#ecfdf5' : '#f0fdf4',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isBeauty ? <Sparkles size={20} /> : <Stethoscope size={20} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                      {record.doctor}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                        {record.specialty}
                      </span>
                      <span style={{ color: '#cbd5e1' }}>•</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {record.clinic}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#065f46', fontWeight: 700, background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                    <Calendar size={14} />
                    <span>{record.date}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                    ID: {record.recordNo}
                  </div>
                </div>
              </div>

              {/* Data Grid: Keluhan, Diagnosa, Tindakan */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                background: '#fafcfb',
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid #f1f5f9'
              }}>
                {/* Keluhan */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '4px' }}>
                    Keluhan Pasien
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#1e293b', fontWeight: 500 }}>
                    {record.complaint}
                  </p>
                </div>

                {/* Diagnosa */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '4px' }}>
                    Diagnosa Medis
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#064e3b', fontWeight: 700 }}>
                    {record.diagnosis}
                  </p>
                </div>

                {/* Tindakan */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '4px' }}>
                    Tindakan / Pemeriksaan
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#334155' }}>
                    {record.action}
                  </p>
                </div>
              </div>

              {/* Catatan Dokter & Terapi Obat */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '0.85rem' }}>
                {record.notes && (
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ClipboardCheck size={15} color="#059669" />
                      Anjuran / Catatan Dokter:
                    </div>
                    <div style={{ color: '#334155' }}>{record.notes}</div>
                  </div>
                )}

                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #d1fae5' }}>
                    <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Pill size={15} color="#10b981" />
                      Resep Obat & Terapi:
                    </div>
                    <ul style={{ paddingLeft: '20px', color: '#064e3b', margin: 0 }}>
                      {record.prescriptions.map((p, idx) => (
                        <li key={idx} style={{ marginBottom: '2px' }}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
