import React, { useEffect, useState } from "react";
import Head from "next/head";
import AuthStatus from "@/components/auth/AuthStatus";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in (client-side only)
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const userInfo = localStorage.getItem("user");
      
      if (loginStatus === "true" && userInfo) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userInfo));
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Welcome | My App</title>
        <meta name="description" content="Welcome to my app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gray-100 flex items-center justify-center relative">
        <AuthStatus />
        
        <div className="text-center space-y-6 max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to My App</h1>
          
          {isLoggedIn && user ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                You are logged in as <span className="font-medium">{user.name}</span>
              </p>
              <p className="text-md text-gray-500">
                Email: {user.email}
              </p>
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-800">
                  This is protected content that only logged-in users can see!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Please log in or create an account to access all features.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/auth/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </a>
                <a 
                  href="/auth/register"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Register
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
