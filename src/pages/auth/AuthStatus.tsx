import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AuthStatus() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    // Check login status from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    const userInfo = localStorage.getItem("user");
    
    if (loginStatus === "true" && userInfo) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-4">
      {isLoggedIn && user ? (
        <>
          <span className="text-sm text-gray-700">Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Login
          </Link>
          <Link href="/auth/register" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">
            Register
          </Link>
        </>
      )}
    </div>
  );
}
