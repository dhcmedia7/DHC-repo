"use client";
import React, { useState, useEffect } from 'react';
import { useAppointment } from '@/context/AppointmentContext';

const AppointmentModal = () => {
  const { isModalOpen, closeModal } = useAppointment();
  const [formData, setFormData] = useState({
    service: '',
    appointmentDate: '',
    appointmentTime: '',
    patientName: '',
    mobileNumber: '',
    age: '',
    gender: '',
  });

  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Function to get the next 3 days in Bengali
    const getNextThreeDays = () => {
      const dates = [];
      const today = new Date();
      for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toLocaleDateString('bn-BD', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        dates.push({
          value: date.toISOString().split('T')[0],
          label: dateString,
        });
      }
      return dates;
    };
    setAvailableDates(getNextThreeDays());
  }, []);

  const timeSlots = [
    { time: 'সকাল ১০:০০ - ১১:৩০', seats: 5 },
    { time: 'সকাল ১১:৩০ - দুপুর ১:০০', seats: 3 },
    { time: 'দুপুর ২:০০ - ৩:৩০', seats: 5 },
    { time: 'বিকাল ৩:৩০ - ৫:০০', seats: 2 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    for (const key in formData) {
      if (formData[key] === '') {
        alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
        return;
      }
    }
    console.log('Appointment Data:', formData);
    alert('আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!');
    closeModal();
    // Reset form
    setFormData({
      service: '',
      appointmentDate: '',
      appointmentTime: '',
      patientName: '',
      mobileNumber: '',
      age: '',
      gender: '',
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-60 z-50 flex justify-center items-center p-4 font-noto-sans-bengali">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative animate-fade-in-down">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          অ্যাপয়েন্টমেন্ট বুক করুন
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Selection */}
          <div>
            <label
              htmlFor="service"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              কি সেবা চান?
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="" disabled>
                সেবা নির্বাচন করুন
              </option>
              <option value="Acupuncture">Acupuncture</option>
              <option value="Acupressure">Acupressure</option>
              <option value="Hijama / Cupping">Hijama / Cupping</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Naturopathy">Naturopathy</option>
            </select>
          </div>

          {/* Appointment Date */}
          <div>
            <label
              htmlFor="appointmentDate"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              অ্যাপয়েন্টমেন্টের তারিখ
            </label>
            <select
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="" disabled>
                তারিখ নির্বাচন করুন
              </option>
              {availableDates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Time */}
          <div>
            <label
              htmlFor="appointmentTime"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              সিরিয়ালের সময়
            </label>
            <select
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="" disabled>
                সময় নির্বাচন করুন
              </option>
              {timeSlots.map((slot) => (
                <option
                  key={slot.time}
                  value={slot.time}
                  disabled={slot.seats === 0}
                >
                  {slot.time} (
                  {slot.seats > 0
                    ? `${slot.seats}টি সিট খালি আছে`
                    : "কোনো সিট খালি নেই"}
                  )
                </option>
              ))}
            </select>
          </div>

          {/* Patient Name */}
          <div>
            <label
              htmlFor="patientName"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              রোগীর নাম
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="আপনার সম্পূর্ণ নাম লিখুন"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              মোবাইল নম্বর
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="একটি সক্রিয় মোবাইল নম্বর দিন"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="age"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                বয়স
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="বয়স"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                লিঙ্গ
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              >
                <option value="" disabled>
                  নির্বাচন করুন
                </option>
                <option value="Male">পুরুষ</option>
                <option value="Female">মহিলা</option>
                <option value="Other">অন্যান্য</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#41a815] text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none  transition-transform transform hover:scale-105 shadow-lg"
          >
            সাবমিট করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;