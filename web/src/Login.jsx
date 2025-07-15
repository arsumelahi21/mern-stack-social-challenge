import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login({ onLogin }) {
  const { setToken } = useAuth();
  const [id, setID] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), 
      });
      if (!res.ok) throw new Error("Invalid username");
      const { token } = await res.json();
      setToken(token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="login-title">Sign In</h2>
        <input
          className="login-input"
          type="text"
          placeholder="ID"
          value={id}
          autoComplete="ID"
          onChange={e => setID(e.target.value)}
          required
        />
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}
