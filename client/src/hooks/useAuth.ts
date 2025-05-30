import React, { useEffect, useState } from "react";
import { To, useNavigate } from "react-router-dom";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL: string = "http://localhost:8000/api";
  const navigate = useNavigate();

  const verifyToken = async (navigationPortal: To) => {
    setIsLoading(true);
    const token: string | null = localStorage.getItem("token");
    const response: Response = await fetch(
      `${API_URL}/auth/verify-token/${token}`
    );

    try {
      if (!response.ok) {
        throw new Error("Response fetch failed");
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate(navigationPortal);
    } finally {
      if (response.ok) {
        setIsLoading(false);
      }
    }
  };

  return {
    verifyToken,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    API_URL,
  };
}
