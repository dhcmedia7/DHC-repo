"use client"
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, Heart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppointment } from "@/context/AppointmentContext";
import AppoinButton from "../Appoinments/AppoinButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { openModal } = useAppointment();
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setInstallPrompt(null);
      });
    }
  };

  // Navigation items
  const navItems = [
    { name: "হোম", href: "/" },
    {
      name: "সেবাসমূহ",
      href: "#",
      hasDropdown: true,
      subItems: [
        { name: "অ্যাকুপ্রেশার", href: "/services/acupressure" },
        { name: "অ্যাকুপাংচার", href: "/services/acupuncture" },
        { name: "হিজামা", href: "/services/hijama" },
        { name: "ব্যথা নিরাময়", href: "/services/pain-relief" },
      ],
    },
    { name: "পরিচিতি", href: "/about" },
    { name: "প্রোডাক্ট", href: "/products" },

    {
      name: "তথ্য এবং অন্যান্য",
      href: "#",
      hasDropdown: true,
      subItems: [
        { name: "ব্লগ", href: "/blog" },
        { name: "রেপার্টরি", href: "/repertory" },
        { name: "প্রশ্নোত্তর", href: "/fqa" },
        { name: "যোগাযোগ", href: "/contact" },
        { name: "সহায়তা", href: "/support" },
      ],
    },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Link href="/">
                <Image
                  src="/images/logo.webp"
                  width={150}
                  height={50}
                  alt="Logo"
                  
                />
              </Link>

              {/* Pulse animation dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 font-medium transition-all duration-200 py-2.5 px-3 xl:px-4 rounded-lg hover:bg-blue-50 group"
                  style={{ fontFamily: "Noto Sans Bengali, Arial, sans-serif" }}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
                          style={{
                            fontFamily: "Noto Sans Bengali, Arial, sans-serif",
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* check */}

          {/* Right Section - CTA & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Phone Button - Desktop */}
            <Link
              href="tel:+8801777276072"
              className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-all duration-200"
              style={{ fontFamily: "Noto Sans Bengali, Arial, sans-serif" }}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:block">কল করুন</span>
            </Link>
            {/* Appointment Button - Desktop */}
            <div className="hidden md:flex">
              <AppoinButton>অ্যাপয়েন্টমেন্ট নিন</AppoinButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen
              ? "h-full overflow-y-scroll opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 text-gray-700 hover:text-blue-400 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors"
                      style={{
                        fontFamily: "Noto Sans Bengali, Arial, sans-serif",
                      }}
                      onClick={
                        item.hasDropdown ? (e) => e.preventDefault() : closeMenu
                      }
                    >
                      {item.name}
                    </Link>

                    {item.hasDropdown && (
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                        className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === item.name
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 space-y-1 py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-blue-400 hover:bg-blue-50 py-2.5 px-4 rounded-lg transition-colors text-sm"
                            style={{
                              fontFamily:
                                "Noto Sans Bengali, Arial, sans-serif",
                            }}
                            onClick={closeMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                      {installPrompt && (
                        <button
                          onClick={handleInstallClick}
                          className="block text-gray-600 hover:text-blue-400 hover:bg-blue-50 py-2.5 px-4 rounded-lg transition-colors text-sm"
                          style={{
                            fontFamily: "Noto Sans Bengali, Arial, sans-serif",
                          }}
                        >
                          <span>Add to Home Screen</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
                <Link
                  href="tel:+8801777276072"
                  className="flex items-center justify-center space-x-3 bg-blue-500 text-white px-6 py-3.5 rounded-full font-semibold transition-all duration-300"
                  style={{ fontFamily: "Noto Sans Bengali, Arial, sans-serif" }}
                  onClick={closeMenu}
                >
                  <Phone className="w-5 h-5" />
                  <span>এখনই কল করুন</span>
                </Link>

                <button
                  onClick={() => {
                    openModal();
                    closeMenu(); // mobile menu close করার জন্য
                  }}
                  className="w-full flex items-center justify-center space-x-3 bg-[#41a815] text-white px-6 py-3.5 rounded-full font-semibold shadow-lg transition-all duration-300"
                  style={{ fontFamily: "Noto Sans Bengali, Arial, sans-serif" }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>অ্যাপয়েন্টমেন্ট বুক করুন</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
