'use client';
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

const appointments = [
    {
      id: 1,
      name: "John Doe",
      service: "Hijama",
      date: "2025-10-15",
      time: "10:00 AM",
      status: "Confirmed",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      service: "Acupuncture",
      date: "2025-10-16",
      time: "02:30 PM",
      status: "Pending",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Sam Wilson",
      service: "Acupressure",
      date: "2025-10-18",
      time: "11:00 AM",
      status: "Completed",
      avatar: "SW",
    },
    {
      id: 4,
      name: "Maria Garcia",
      service: "Hijama",
      date: "2025-10-19",
      time: "09:30 AM",
      status: "Confirmed",
      avatar: "MG",
    },
  ];

export default function AppointmentManager({ searchQuery, setSearchQuery }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Appointment</span>
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
                <th className="text-left p-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={appt.id}
                  className="border-t border-gray-100 hover:bg-gray-50/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {appt.avatar}
                      </div>
                      <span className="font-medium text-gray-900">
                        {appt.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{appt.service}</td>
                  <td className="p-4">
                    <div className="text-gray-900 font-medium">{appt.time}</div>
                    <div className="text-sm text-gray-600">{appt.date}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        appt.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appt.status === "Confirmed" && (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {appt.status === "Pending" && (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {appt.status === "Completed" && (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
