import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/LoadingComponent/Loading";

export default function UserNotes() {
  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/auth/verify-token/${token}`);

      try {
        if (!response.ok) {
          console.log("error!", "line 19");
          throw new Error("Token verification failed");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("error!", "line 25");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      } finally {
        if (response.ok) {
          setIsLoading(false);
        }
      }
    };

    verifyToken();

    return;
  }, [navigate]);

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>Notes, Protected</h1>
      <button onClick={(e) => handleLogout(e)}>Signout</button>
    </div>
  );
}
