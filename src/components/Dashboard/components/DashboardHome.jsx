'use client';
import {
  Calendar,
  Users,
  DollarSign,
  FileText,
  TrendingUp,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Appointments',
    value: '147',
    change: '+12%',
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Active Patients',
    value: '89',
    change: '+8%',
    icon: <Users className="w-6 h-6" />,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Blog Posts',
    value: '24',
    change: '+3%',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-orange-500 to-orange-600',
  },
];

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

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Recent Appointments
          </h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {appointments.slice(0, 3).map((appt) => (
            <div
              key={appt.id}
              className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {appt.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appt.name}</p>
                  <p className="text-sm text-gray-600">{appt.service}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900 font-medium">{appt.time}</p>
                <p className="text-xs text-gray-600">{appt.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
