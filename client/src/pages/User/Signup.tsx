import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// USE CLERK !!!!! REMAKING WHOLE AUTH PROCESS

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !username) {
      setError("Uh oh! Something is missing. Please fill in all fields.");
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
    formDetails.append("username", username);
    formDetails.append("email", email);
    formDetails.append("password", password);

    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: "POST",
        body: formDetails,
      });

      setIsLoading(false);

      if (response.ok) {
        const signinDetails = new URLSearchParams();
        signinDetails.append("username", email);
        signinDetails.append("password", password);

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
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="form-class">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
