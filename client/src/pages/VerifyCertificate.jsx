import { useState } from "react";
import API_BASE from "../../apiConfig";
import {
  Search,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Hash,
  IdCard,
  Stamp,
  PenTool,
  Copy,
  Check
} from "lucide-react";

export default function VerifyCertificate() {
  const [verifyType, setVerifyType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState({ uid: false, hash: false });
  const [certificateData, setCertificateData] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setCertificateData(null);

    if (!inputValue.trim()) {
      setError(
        `Please enter a valid ${verifyType === "uid" ? "Certificate UID" : "Transaction Hash"
        }`
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/certificate/verifyCertificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [verifyType === "uid" ? "certificate_uid" : "transaction_hash"]:
            inputValue,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      setCertificateData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ uid: false, hash: false, [type]: true });
      setTimeout(() => setCopied({ uid: false, hash: false }), 1500);
    } catch {
      alert("Failed to copy!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card max-w-2xl w-full rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Verify Certificate
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Choose how you want to verify the certificate — using its unique UID or
          blockchain transaction hash.
        </p>

        {/* Step 1: Select verification method */}
        {!verifyType && (
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
            <button
              onClick={() => setVerifyType("uid")}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 ultra-smooth transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <IdCard className="w-5 h-5" />
              <span>Use Certificate UID</span>
            </button>

            <button
              onClick={() => setVerifyType("hash")}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-semibold hover:from-purple-500 hover:to-indigo-700 ultra-smooth transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <Hash className="w-5 h-5" />
              <span>Use Transaction Hash</span>
            </button>
          </div>
        )}

        {/* Step 2: Input + Submit */}
        {verifyType && (
          <form onSubmit={handleVerify} className="space-y-6 mt-8">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${verifyType === "uid"
                    ? "Certificate UID"
                    : "Blockchain Transaction Hash"
                  }`}
                className="flex-grow p-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center ultra-smooth transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setVerifyType("");
                setInputValue("");
                setError("");
                setCertificateData(null);
              }}
              className="text-sm text-gray-400 hover:text-gray-200 underline block mx-auto"
            >
              ← Change verification method
            </button>
          </form>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Verified Data */}
        {certificateData && (
          <div className="mt-10 bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-yellow-500/40 rounded-2xl text-white p-8 relative shadow-2xl animate-fadeIn">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-500/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/30 rounded-full blur-2xl"></div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
                Certificate of Completion
              </h3>
              <p className="text-gray-300 text-sm italic">
                This is to certify that the following record is verified on the blockchain
              </p>
            </div>

            <div className="border border-gray-600 rounded-xl p-6 bg-black/30 backdrop-blur-md space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Candidate Name</p>
                  <p className="text-lg font-semibold text-white">
                    {certificateData.blockchain_data.student_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Organization</p>
                  <p className="text-lg font-semibold text-white">
                    {certificateData.blockchain_data.org_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Course Name</p>
                  <p className="text-lg font-semibold text-white">
                    {certificateData.blockchain_data.course_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Expiration Date</p>
                  <p className="text-lg font-semibold text-white">
                    {certificateData.blockchain_data.expiration_date
                      ? new Date(
                        certificateData.blockchain_data.expiration_date
                      ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Certificate UID */}
              <div className="mt-6 border-t border-gray-600 pt-4 text-center space-y-3">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-gray-400 text-sm">Certificate UID</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-blue-400 font-mono text-xs break-all">
                      {certificateData.certificate_uid}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(certificateData.certificate_uid, "uid")
                      }
                      className="p-1 hover:bg-blue-500/20 rounded-md"
                      title="Copy UID"
                    >
                      {copied.uid ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {copied.uid && (
                    <p className="text-green-400 text-xs animate-fadeIn">
                      Copied!
                    </p>
                  )}
                </div>

                {/* Transaction Hash */}
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-gray-400 text-sm">Transaction Hash</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-purple-400 font-mono text-xs break-all">
                      {certificateData.transaction_hash}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(certificateData.transaction_hash, "hash")
                      }
                      className="p-1 hover:bg-purple-500/20 rounded-md"
                      title="Copy Transaction Hash"
                    >
                      {copied.hash ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {copied.hash && (
                    <p className="text-green-400 text-xs animate-fadeIn">
                      Copied!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seal and Signature */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 border-4 border-yellow-500/50 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xs uppercase tracking-widest">
                  <Stamp className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Official Seal</p>
              </div>

              <div className="flex flex-col items-center">
                <PenTool className="w-8 h-8 text-blue-400" />
                <div className="w-32 h-px bg-gray-500 mt-2"></div>
                <p className="text-xs text-gray-400 mt-1">Authorized Signature</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
