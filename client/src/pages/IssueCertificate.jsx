import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../apiConfig";

export default function IssueCertificate() {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [issuedData, setIssuedData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIssuedData(null);

    if (!studentName || !courseName || !expirationDate) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/certificate/issueCertificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_name: studentName,
          course_name: courseName,
          expiration_date: expirationDate,
          student_email : studentEmail
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to issue certificate");
      }

      const sendCertificateRes = await fetch(`${API_BASE}/email/send-certificate`,{
        method : "POST",
        headers: {
          'Content-Type' : 'application/json',
          Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
          student_email: studentEmail,
          certificate_uid: data.certificate_uid,
          transaction_hash: data.transaction_hash
        })
      })

      const sendCertificateData = await sendCertificateRes.json();

      if(!sendCertificateRes.ok){
        throw new Error (sendCertificateData.message || "Failed to send certificate via email")
      }

      setSuccess("Certificate issued successfully and sent via email" || data.message);

      setIssuedData({
        certificate_uid: data.certificate_uid,
        transaction_hash: data.transaction_hash,
      });

      setStudentName("");
      setCourseName("");
      setExpirationDate("");
      setStudentEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong while issuing certificate.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="aspect-video w-full max-w-3xl glass-card rounded-3xl p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Issue Certificate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Candidate Name"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Candidate Email"
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl 
              bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold tracking-wide
              transition-all duration-300 ease-out
              hover:from-purple-500 hover:to-blue-500 
              hover:scale-105 hover:-translate-y-0.5 
              hover:shadow-lg hover:shadow-purple-500/40
              active:scale-95 active:shadow-none
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Issuing..." : "Issue Certificate"}
          </button>
        </form>

        {/* ✅ Show issued certificate details */}
        {issuedData && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-white space-y-3 text-center animate-fadeIn">
            <h3 className="text-lg font-semibold text-green-400">
              Certificate Issued Successfully 🎉
            </h3>
            <p>
              <span className="text-gray-400 text-sm">Certificate UID:</span>{" "}
              <span className="font-mono text-blue-400">
                {issuedData.certificate_uid}
              </span>
            </p>
            <p>
              <span className="text-gray-400 text-sm">Transaction Hash:</span>{" "}
              <span className="font-mono text-purple-400 break-all">
                {issuedData.transaction_hash}
              </span>
            </p>
          </div>
        )}

        <div className="text-center mt-6 text-gray-300">
          <button
            onClick={() => navigate("/dashboard", { viewTransition: true })}
            className="text-purple-400 hover:text-purple-300 font-semibold underline-offset-2 hover:underline transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
