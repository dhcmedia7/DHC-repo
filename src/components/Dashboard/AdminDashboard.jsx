'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import AppointmentManager from './components/AppointmentManager';
import ProductManager from './components/ProductManager';
import BlogManager from './components/BlogManager';

export default function AdminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    blogTitle: '',
    blogContent: '',
    blogCategory: '',
    blogTags: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProductSubmit = () => {
    console.log('Product submitted:', {
      name: formData.productName,
      price: formData.productPrice,
      description: formData.productDescription,
    });
    // Reset form
    setFormData((prev) => ({
      ...prev,
      productName: '',
      productPrice: '',
      productDescription: '',
    }));
  };

  const handleBlogSubmit = () => {
    console.log('Blog submitted:', {
      title: formData.blogTitle,
      content: formData.blogContent,
      category: formData.blogCategory,
      tags: formData.blogTags,
    });
    // Reset form
    setFormData((prev) => ({
      ...prev,
      blogTitle: '',
      blogContent: '',
      blogCategory: '',
      blogTags: '',
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'appointments':
        return <AppointmentManager searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case 'products':
        return <ProductManager formData={formData} handleInputChange={handleInputChange} handleProductSubmit={handleProductSubmit} />;
      case 'blogs':
        return <BlogManager formData={formData} handleInputChange={handleInputChange} handleBlogSubmit={handleBlogSubmit} />;
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