import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();

  const API_URL = auth.API_URL;
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

    const formDetails = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response: Response = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        try {
          const formDetails: URLSearchParams = new URLSearchParams();
          formDetails.append("username", email);
          formDetails.append("password", password);
          const response = await fetch(`${API_URL}/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formDetails,
          });
          setIsLoading(false);
          auth.setIsAuthenticated(true);

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
          auth.setIsAuthenticated(false);
          setError("An error occured authenticating! Please try again.");
        }
      }
    } catch (error) {
      setIsLoading(false);
      auth.setIsAuthenticated(false);
      setError("An error has oocured! Please try again.");
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
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
