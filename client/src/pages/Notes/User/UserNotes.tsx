import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserNotes() {
  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (!token) {
      if (isMounted) {
        setIsLoading(false);
        setIsAuthenticated(false);
        navigate("/");
      }
      return;
    }

    const verifyTokenOnMount = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify-token/${token}`);
        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        if (isMounted) {
          setIsAuthenticated(false);
          navigate("/");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyTokenOnMount();

    return () => {
      isMounted = false;
    };
  }, [navigate, API_URL]);

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");

    if (token) {
      try {
        await fetch(`${API_URL}/auth/invalidate-token/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  return (
    <div>
      <h1>Notes, Protected</h1>
      <button onClick={(e) => handleLogout(e)}>Signout</button>
    </div>
  );
}
