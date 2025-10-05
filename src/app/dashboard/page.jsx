"use client";
import { useState, useEffect } from "react";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    if (loginState === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {!isLoggedIn ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg md:w-1/4 p-8 w-full m-5">
            <h1 className="text-2xl font-semibold text-center mb-6">
              Welcome Back
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);

                const email = e.target.email.value.trim();
                const pass = e.target.password.value.trim();

                try {
                  const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, pass }),
                  });

                  if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    localStorage.setItem("isLoggedIn", "true");
                    setIsLoggedIn(true);
                  } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Invalid credentials");
                  }
                } catch (error) {
                  console.error("Login failed:", error);
                  alert("An error occurred. Please try again.");
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 bg-white py-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <AdminDashboard handleLogout={handleLogout} />
      )}
    </div>
  );
}
