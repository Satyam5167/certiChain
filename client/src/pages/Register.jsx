import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../apiConfig";

export default function Register({ onAuthSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      registering ||
      !name.trim() ||
      !company.trim() ||
      !email.trim() ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      setError("Invalid inputs or passwords do not match.");
      return;
    }

    setRegistering(true);
    setError("");
    setSuccessMsg("");

    try {
      // Step 1: Send OTP if not sent yet
      if (!otpSent) {
        const otpRes = await fetch(`${API_BASE}/email/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const otpData = await otpRes.json();

        if (!otpRes.ok) {
          throw new Error(otpData.message || "Failed to send OTP");
        }

        setOtpSent(true);
        setSuccessMsg("OTP sent to your email. Please verify to continue.");
        setRegistering(false);
        return;
      }

      // Step 2: Verify OTP
      const verifyRes = await fetch(`${API_BASE}/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.message || "Invalid or expired OTP");
      }

      // Step 3: Register user
      const registerRes = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          company_name: company,
        }),
      });

      const registerData = await registerRes.json();

      if (registerRes.ok && registerData.token) {
        localStorage.setItem("token", registerData.token);
        onAuthSuccess?.();
        navigate("/dashboard", { viewTransition: true });
      } else {
        throw new Error(registerData.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="aspect-video w-full max-w-3xl glass-card rounded-3xl p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

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

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {otpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          )}

          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          {successMsg && (
            <p className="text-green-400 text-center font-medium">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={registering}
            className="w-full py-3 rounded-xl 
             bg-gradient-to-r from-purple-600 to-blue-600 
             text-white font-semibold tracking-wide
             transition-all duration-300 ease-out
             hover:from-purple-500 hover:to-blue-500 
             hover:scale-105 hover:-translate-y-0.5 
             hover:shadow-lg hover:shadow-purple-500/40
             active:scale-95 active:shadow-none
             disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {registering
              ? "Processing..."
              : otpSent
              ? "Verify OTP & Register"
              : "Send OTP"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          Already registered?{" "}
          <button
            onClick={() => navigate("/login", { viewTransition: true })}
            className="text-purple-400 hover:text-purple-300 font-semibold underline-offset-2 hover:underline transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}