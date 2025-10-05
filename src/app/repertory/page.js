// app/repertory/page.jsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ChevronRight, Search, Home } from "lucide-react";



const RepertoryPage = () => {
  const [repertoryData, setRepertoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("main"); // main, section1, details
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSection1, setSelectedSection1] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    fetch("/full_rep_en.json")
      .then((response) => response.json())
      .then((data) => {
        setRepertoryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repertory data:", error);
        setLoading(false);
      });
  }, []);

  // Get unique section_main with counts
  const uniqueSectionMain = useMemo(() => {
    if (!repertoryData.length) return [];

    const sectionMap = new Map();
    repertoryData.forEach((item) => {
      if (item.section_main) {
        if (!sectionMap.has(item.section_main)) {
          sectionMap.set(item.section_main, 0);
        }
        sectionMap.set(
          item.section_main,
          sectionMap.get(item.section_main) + 1
        );
      }
    });

    return Array.from(sectionMap.entries())
      .map(([name, count]) => ({ name, count }))
      .filter(
        (item) =>
          searchTerm === "" ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [repertoryData, searchTerm]);

  // Get unique section1 for selected section_main
  const uniqueSection1 = useMemo(() => {
    if (!selectedMain || !repertoryData.length) return [];

    const section1Map = new Map();
    repertoryData
      .filter((item) => item.section_main === selectedMain)
      .forEach((item) => {
        if (item.section1) {
          if (!section1Map.has(item.section1)) {
            section1Map.set(item.section1, 0);
          }
          section1Map.set(item.section1, section1Map.get(item.section1) + 1);
        }
      });

    return Array.from(section1Map.entries())
      .map(([name, count]) => ({ name, count }))
      .filter(
        (item) =>
          searchTerm === "" ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [repertoryData, selectedMain, searchTerm]);

  // Get details for selected section1
  const sectionDetails = useMemo(() => {
    if (!selectedMain || !selectedSection1 || !repertoryData.length) return [];

    return repertoryData.filter(
      (item) =>
        item.section_main === selectedMain &&
        item.section1 === selectedSection1 &&
        (searchTerm === "" ||
          item.prp1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.prp2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.prp3?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [repertoryData, selectedMain, selectedSection1, searchTerm]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    let dataToShow = [];

    if (currentView === "main") {
      dataToShow = uniqueSectionMain;
    } else if (currentView === "section1") {
      dataToShow = uniqueSection1;
    } else if (currentView === "details") {
      dataToShow = sectionDetails;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return {
      items: dataToShow.slice(startIndex, endIndex),
      totalPages: Math.ceil(dataToShow.length / ITEMS_PER_PAGE),
      totalItems: dataToShow.length,
    };
  }, [
    currentView,
    uniqueSectionMain,
    uniqueSection1,
    sectionDetails,
    currentPage,
  ]);

  // Navigation handlers
  const handleMainClick = (mainSection) => {
    setSelectedMain(mainSection);
    setCurrentView("section1");
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleSection1Click = (section1) => {
    setSelectedSection1(section1);
    setCurrentView("details");
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleBackClick = () => {
    if (currentView === "section1") {
      setCurrentView("main");
      setSelectedMain(null);
    } else if (currentView === "details") {
      setCurrentView("section1");
      setSelectedSection1(null);
    }
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleHomeClick = () => {
    setCurrentView("main");
    setSelectedMain(null);
    setSelectedSection1(null);
    setCurrentPage(1);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading repertory data...</div>
        </div>
      </div>
    );
  }

  return (
    <>
    <h1 className="sr-only">রোগ লক্ষণ অনুযায়ী চিকিৎসা খুঁজুন - দরদী হেলথ কেয়ার (DHC) রেপার্টরি</h1>
    <h2 className="sr-only">আমাদের পূর্ণাঙ্গ হোমিওপ্যাথিক রেপার্টরি থেকে আপনার প্রয়োজনীয় তথ্য জানুন</h2>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
      <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        হোমিওপ্যাথিক রেপার্টরি
      </p>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <button
          onClick={handleHomeClick}
          className="text-blue-600 hover:text-blue-800"
        >
          <Home className="w-4 h-4" />
        </button>
        {selectedMain && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() =>
                currentView !== "section1" ? handleBackClick() : null
              }
              className={
                currentView !== "section1"
                  ? "text-blue-600 hover:text-blue-800"
                  : "text-gray-700"
              }
            >
              {selectedMain}
            </button>
          </>
        )}
        {selectedSection1 && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">{selectedSection1}</span>
          </>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              currentView === "main"
                ? "Search sections..."
                : currentView === "section1"
                ? "Search subsections..."
                : "Search remedies..."
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedData.items.length} of {paginatedData.totalItems}{" "}
        results
      </div>

      {/* Content Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {currentView === "main" &&
          paginatedData.items.map((item) => (
            <div
              key={item.name}
              onClick={() => handleMainClick(item.name)}
              className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {item.count} entries
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}

        {currentView === "section1" &&
          paginatedData.items.map((item) => (
            <div
              key={item.name}
              onClick={() => handleSection1Click(item.name)}
              className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {item.count} entries
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}

        {currentView === "details" &&
          paginatedData.items.map((item, index) => (
            <div
              key={item._id || index}
              className="border border-gray-200 p-4 rounded-lg"
            >
              <div className="space-y-2">
                {item.prp3 && (
                  <div className="bg-red-50 p-3 rounded">
                    <span className="font-semibold text-red-700">
                      Grade 3:{" "}
                    </span>
                    <span className="text-red-600">{item.prp3}</span>
                  </div>
                )}
                {item.prp2 && (
                  <div className="bg-yellow-50 p-3 rounded">
                    <span className="font-semibold text-yellow-700">
                      Grade 2:{" "}
                    </span>
                    <span className="text-yellow-600">{item.prp2}</span>
                  </div>
                )}
                {item.prp1 && (
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-semibold text-gray-700">
                      Grade 1:{" "}
                    </span>
                    <span className="text-gray-600">{item.prp1}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {paginatedData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {paginatedData.totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(paginatedData.totalPages, p + 1))
            }
            disabled={currentPage === paginatedData.totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* Back Button */}
      {currentView !== "main" && (
        <button
          onClick={handleBackClick}
          className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Back
        </button>
      )}
    </div>
    </>
  );
};

export default RepertoryPage;
