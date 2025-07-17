import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

// USE CLERK !!!!! REMAKING WHOLE AUTH PROCESS

=======
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !username) {
      setError("Uh oh! Something is missing. Please fill in all fields.");
=======
  const auth = useAuth();

  const API_URL = auth.API_URL;
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("Uh oh! Username or password is missing.");
>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

<<<<<<< HEAD
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
=======
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
>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba
          const response = await fetch(`${API_URL}/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formDetails,
          });
<<<<<<< HEAD

          setIsLoading(false);
=======
          setIsLoading(false);
          auth.setIsAuthenticated(true);
>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba

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
<<<<<<< HEAD
          setError("An error has occured! Please try again later.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Authentication failed!");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error has occured! Please try again later.");
=======
          auth.setIsAuthenticated(false);
          setError("An error occured authenticating! Please try again.");
        }
      }
    } catch (error) {
      setIsLoading(false);
      auth.setIsAuthenticated(false);
      setError("An error has oocured! Please try again.");
>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba
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
<<<<<<< HEAD
            {isLoading ? "Signing Up..." : "Sign Up"}
=======
            {isLoading ? "Signing up..." : "Sign up"}
>>>>>>> a6f5d5109368b02173db7ae7d74e3378bf5f1aba
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
