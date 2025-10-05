'use client';
import {
  Menu,
  Bell,
  User,
} from 'lucide-react';

export default function Header({ activeTab, setSidebarOpen }) {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'appointments':
        return 'Appointments';
      case 'products':
        return 'Products';
      case 'blogs':
        return 'Blog Posts';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-4"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getTitle()}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage your healthcare business efficiently
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-xl relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
