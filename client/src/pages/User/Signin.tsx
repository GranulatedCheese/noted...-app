import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Uh oh! Username or password is missing.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append("username", email);
    formDetails.append("password", password);

    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDetails,
      });

      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        navigate("/user-notes");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Authentication failed!");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error has occured! Please try again later.");
    }
  };

  return (
    <div className="mx-7 ml-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
