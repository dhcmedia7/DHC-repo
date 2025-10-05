
"use client";
import React, { createContext, useState, useContext } from 'react';
import AppointmentModal from '@/components/Appoinments/AppointmentModal';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AppointmentContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <AppointmentModal />
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
