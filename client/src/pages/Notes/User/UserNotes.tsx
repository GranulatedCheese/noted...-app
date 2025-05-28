import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/LoadingComponent/Loading";
import useAuth from "../../../hooks/useAuth";

export default function UserNotes() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    auth.verifyToken("/");

    return;
  }, [navigate]);

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    auth.setIsAuthenticated(false);
    navigate("/");
  };

  if (auth.isLoading) return <Loading />;

  return (
    <>
      <div>
        <h1>Notes, Protected</h1>
        <button onClick={(e) => handleLogout(e)}>Signout</button>
      </div>
    </>
  );
}
