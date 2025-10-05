'use client';
import {
  LayoutDashboard,
  ShoppingBag,
  Newspaper,
  LogOut,
  Calendar,
  X,
} from 'lucide-react';

const NavItem = ({ icon, label, tabName, badge, activeTab, setActiveTab, setSidebarOpen }) => (
  <li
    className={`flex items-center justify-between p-3 cursor-pointer rounded-xl transition-all duration-200 ${
      activeTab === tabName
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
    onClick={() => {
      setActiveTab(tabName);
      setSidebarOpen(false);
    }}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </li>
);

export default function Sidebar({ activeTab, setActiveTab, handleLogout, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transform transition-transform duration-300 z-50 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <LayoutDashboard className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold text-gray-900 ml-3">
                  Admin Panel
                </h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              <NavItem
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                tabName="dashboard"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSidebarOpen={setSidebarOpen}
              />
              <NavItem
                icon={<Calendar size={20} />}
                label="Appointments"
                tabName="appointments"
              
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSidebarOpen={setSidebarOpen}
              />
              <NavItem
                icon={<ShoppingBag size={20} />}
                label="Add Product"
                tabName="products"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSidebarOpen={setSidebarOpen}
              />
              <NavItem
                icon={<Newspaper size={20} />}
                label="Create Blog"
                tabName="blogs"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSidebarOpen={setSidebarOpen}
              />
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 cursor-pointer rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="ml-3 font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
