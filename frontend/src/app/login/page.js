"use client";
import { useState } from "react";
import "./login.css"; // Import external CSS

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Logging in with:", { username, password });

    // Redirect to dashboard after login
    window.location.href = "http://localhost:3000/dashboard"; // Redirect to the dashboard
  };

  return (
    <div className="container">
      <h1>Better Recipes</h1>

      <div className="login-box">
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}


