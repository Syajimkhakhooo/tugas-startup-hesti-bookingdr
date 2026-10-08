import React, { useState, useEffect } from 'react';
import { initialAppointments } from './data/appointments';
import { medicalRecordsData } from './data/medicalRecords';
import { doctorsData } from './data/doctors';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import BookingSuccessModal from './components/BookingSuccessModal';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Riwayat from './pages/Riwayat';
import RekamMedis from './pages/RekamMedis';
import Profil from './pages/Profil';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('klinik_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged in as Hesti for smooth immediate preview, can log out anytime
    return {
      email: 'hesti@gmail.com',
      name: 'Hesti',
      role: 'Pasien Terdaftar',
      mrn: 'RM-2026-0891'
    };
  });

  // Appointments State with LocalStorage persistence
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('klinik_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialAppointments; }
    }
    return initialAppointments;
  });

  // Save appointments changes to localStorage
  useEffect(() => {
    localStorage.setItem('klinik_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Save user changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('klinik_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('klinik_user');
    }
  }, [currentUser]);

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preSelectedDoctor, setPreSelectedDoctor] = useState(null);

  // Success Modal State
  const [newlyCreatedBooking, setNewlyCreatedBooking] = useState(null);

  // Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
  };

  const handleDoctorSelectFromDashboard = (doctor) => {
    setPreSelectedDoctor(doctor);
    setActiveTab('booking');
  };

  const handleBookingSubmit = (bookingData) => {
    // Prepend new booking so it appears first in list
    setAppointments([bookingData, ...appointments]);
    setNewlyCreatedBooking(bookingData);
  };

  const handleCloseSuccessModal = () => {
    setNewlyCreatedBooking(null);
  };

  const handleGoToRiwayatFromModal = () => {
    setNewlyCreatedBooking(null);
    setActiveTab('riwayat');
  };

  const handleGoToDashboardFromModal = () => {
    setNewlyCreatedBooking(null);
    setActiveTab('dashboard');
  };

  // If user is not logged in, show Login page
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={currentUser}
        onLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Main Viewport */}
      <div className="main-viewport">
        <Topbar
          onMenuClick={() => setIsMobileMenuOpen(true)}
          activeTab={activeTab}
          user={currentUser}
        />

        <main className="page-container">
          {activeTab === 'dashboard' && (
            <Dashboard
              user={currentUser}
              appointments={appointments}
              medicalRecords={medicalRecordsData}
              doctors={doctorsData}
              onNavigateToBooking={() => {
                setPreSelectedDoctor(null);
                setActiveTab('booking');
              }}
              onSelectDoctorToBook={handleDoctorSelectFromDashboard}
              onNavigateToRiwayat={() => setActiveTab('riwayat')}
              onNavigateToRecords={() => setActiveTab('rekammedis')}
            />
          )}

          {activeTab === 'booking' && (
            <Booking
              doctors={doctorsData}
              appointments={appointments}
              preSelectedDoctor={preSelectedDoctor}
              onBookingSubmit={handleBookingSubmit}
              user={currentUser}
            />
          )}

          {activeTab === 'riwayat' && (
            <Riwayat
              appointments={appointments}
              onNavigateToBooking={() => {
                setPreSelectedDoctor(null);
                setActiveTab('booking');
              }}
            />
          )}

          {activeTab === 'rekammedis' && (
            <RekamMedis
              records={medicalRecordsData}
              user={currentUser}
            />
          )}

          {activeTab === 'profil' && (
            <Profil user={currentUser} />
          )}
        </main>
      </div>

      {/* Booking Success Modal */}
      {newlyCreatedBooking && (
        <BookingSuccessModal
          booking={newlyCreatedBooking}
          onClose={handleCloseSuccessModal}
          onGoToRiwayat={handleGoToRiwayatFromModal}
          onGoToDashboard={handleGoToDashboardFromModal}
        />
      )}
    </div>
  );
}
