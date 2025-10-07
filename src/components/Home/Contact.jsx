'use client';
import React, { useState } from 'react';
import ContactAnimation from './ContactAnimation';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', phone: '', message: '' });

    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="md:flex items-center gap-5">
          <div className="md:w-1/2">
            <div className="flex justify-center animate-bounce-slow">
              <ContactAnimation />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                যোগাযোগ ও অ্যাপয়েন্টমেন্ট
              </h2>
              <p className="text-lg text-text-color mt-2">
                অ্যাপয়েন্টমেন্ট বা যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
              </p>
            </div>
            <div className="">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="আপনার নাম"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    আপনার ফোন নম্বর
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="আপনার ফোন নম্বর"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    আপনার বার্তা
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    placeholder="আপনার বার্তা"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:outline-none"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-16 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 flex items-center justify-center w-full"
                  >
                    {isLoading ? <><Loader2 className="animate-spin mr-2" /> Sending...</> : 'বার্তা পাঠান'}
                  </button>
                </div>
                {status.message && (
                  <p className={`text-center mt-4 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;