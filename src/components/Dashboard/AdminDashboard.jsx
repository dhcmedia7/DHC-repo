'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import AppointmentManager from './components/AppointmentManager';
import ProductManager from './components/ProductManager';
import BlogManager from './components/BlogManager';
import TimeSlotManager from './components/TimeSlotManager';

export default function AdminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productFormData, setProductFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productImages: [],
  });

  const handleProductInputChange = (field, value) => {
    setProductFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductSubmit = async () => {
    // Logic to submit the product will be added here later
    console.log('Submitting product:', productFormData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'appointments':
        return <AppointmentManager searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case 'products':
        return <ProductManager
          formData={productFormData}
          handleInputChange={handleProductInputChange}
          handleProductSubmit={handleProductSubmit}
        />;
      case 'blogs':
        return <BlogManager />;
      case 'timeslots':
        return <TimeSlotManager />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="lg:ml-80 min-h-screen">
        <Header activeTab={activeTab} setSidebarOpen={setSidebarOpen} />
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}