
"use client";
import React, { useState, useEffect } from 'react';


const TimeSlotManager = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchTimeSlots = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/timeslots?context=admin');
      if (!response.ok) {
        throw new Error('Failed to fetch time slots.');
      }
      const data = await response.json();
      setTimeSlots(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const handleToggleSlot = (slotId) => {
    setTimeSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === slotId ? { ...slot, isEnabled: !slot.isEnabled } : slot
      )
    );
  };
  
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);
      const response = await fetch('/api/timeslots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeSlots),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes.');
      }

      setSuccess('Changes saved successfully!');
      fetchTimeSlots(); // Re-fetch to ensure data is in sync
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
    }
  };


  if (isLoading) {
    return <div className="text-center p-8">Loading time slots...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-noto-sans-bengali">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Time Slot Management</h1>
            <p className="text-sm text-gray-600 mt-1">
                Enable or disable appointment slots. Changes will be reflected in the user-facing appointment form.
            </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timeSlots.map(slot => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg flex items-center justify-between transition-all ${
                  slot.isEnabled ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {slot.time}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    {slot.bookedPatients} / {slot.maxPatients} patients booked
                  </p> */}
                </div>
                <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        slot.isEnabled ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                        {slot.isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <button
                        onClick={() => handleToggleSlot(slot.id)}
                        className={`px-4 py-2 rounded-md text-white font-semibold transition-colors ${
                        slot.isEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {slot.isEnabled ? 'Disable' : 'Enable'}
                    </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            {error && <div className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}
            {success && <div className="text-green-600 bg-green-100 p-3 rounded-lg">{success}</div>}
          </div>
          <div className="mt-8 text-right">
            <button 
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition-all transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManager;
