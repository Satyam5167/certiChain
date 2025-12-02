import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../apiConfig";
export default function Login({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticating) return;
    setAuthenticating(true);

    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        onAuthSuccess?.();
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Failed to Authenticate');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* 16:9 container */}
      <div className="aspect-video w-full max-w-3xl glass-card rounded-3xl p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* Error message */}
          {error && (
            <p className="text-center text-red-400 text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold tracking-wide transition-all duration-300 ease-out
              hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:-translate-y-0.5 
              hover:shadow-lg hover:shadow-purple-500/40 active:scale-95 active:shadow-none 
              ${isAuthenticating ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isAuthenticating ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Sign Up Option */}
        <div className="text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register", { viewTransition: true })}
            className="text-purple-400 hover:text-purple-300 font-semibold underline-offset-2 hover:underline transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}