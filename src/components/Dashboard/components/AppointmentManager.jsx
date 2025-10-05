'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';

const getInitials = (name) => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const StatusBadge = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  
  if (status === 'Confirmed') {
    return (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        <CheckCircle className="w-4 h-4 mr-1" />
        Confirmed
      </span>
    );
  }
  if (status === 'Completed') {
    return (
      <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
        <CheckCircle className="w-4 h-4 mr-1" />
        Completed
      </span>
    );
  }
   if (status === 'Cancelled') {
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>
        <XCircle className="w-4 h-4 mr-1" />
        Cancelled
      </span>
    );
  }
  // Default to Pending
  return (
    <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
      <Clock className="w-4 h-4 mr-1" />
      Pending
    </span>
  );
};

export default function AppointmentManager({ searchQuery, setSearchQuery }) {
  const { appointments, loading, error, refetch } = useAppointments();

  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return appointments;
    return appointments.filter(
      (appt) =>
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.mobileNumber.includes(searchQuery)
    );
  }, [appointments, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, service, mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
           <button 
            onClick={() => refetch()} 
            disabled={loading}
            className="p-2 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl text-gray-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Refresh Appointments"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Patient
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Service
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>
                {/* <th className="text-left p-4 font-semibold text-gray-900">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">
                    Loading appointments...
                  </td>
                </tr>
              ) : error ? (
                 <tr>
                  <td colSpan="5" className="text-center p-8 text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-t border-gray-100 hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {getInitials(appt.patientName)}
                        </div>
                        <div>
                           <span className="font-medium text-gray-900">
                            {appt.patientName}
                          </span>
                          <div className="text-sm text-gray-600">{appt.mobileNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">{appt.service}</td>
                    <td className="p-4">
                      <div className="text-gray-900 font-medium">{appt.appointmentTime}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(appt.appointmentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={appt.status} />
                    </td>
                    {/* <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Appointment">
                          <Edit3 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete Appointment">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
