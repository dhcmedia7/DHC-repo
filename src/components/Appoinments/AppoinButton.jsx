
"use client";
import React from 'react';
import { useAppointment } from '@/context/AppointmentContext';

const AppoinButton = ({ children }) => {
  const { openModal } = useAppointment();

  return (
    <button
      onClick={openModal}
      className="w-full bg-[#65cc39] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#65cc39]/70 focus:outline-none transition-transform transform hover:scale-105 shadow-lg"
    >
      {children || "Book Appointment"}
    </button>
  );
};

export default AppoinButton;
