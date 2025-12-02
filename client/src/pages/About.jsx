import { Linkedin, Instagram, Github, Code2, ShieldCheck, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white">
      {/* Container */}
      <div className="glass-card max-w-4xl w-full rounded-3xl p-10 space-y-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            About CertiChain
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            CertiChain is a blockchain-powered certification platform that ensures
            <span className="text-purple-300 font-medium"> authenticity </span>,
            <span className="text-purple-300 font-medium"> transparency </span>,
            and <span className="text-purple-300 font-medium"> trust </span> in digital credentials.
            It allows organizations to issue, verify, and manage certificates that are
            permanently recorded on the blockchain — secure, verifiable, and tamper-proof.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 ultra-smooth">
            <Award className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Issue Certificates</h3>
            <p className="text-gray-400 text-sm">
              Create and publish blockchain-verified certificates for learners.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 ultra-smooth">
            <ShieldCheck className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Verify Authenticity</h3>
            <p className="text-gray-400 text-sm">
              Verify certificates instantly using UID or transaction hash.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 ultra-smooth">
            <Code2 className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Immutable Blockchain Records</h3>
            <p className="text-gray-400 text-sm">
              All certificates are securely stored on the blockchain ledger.
            </p>
          </div>
        </div>

        {/* Developer Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Meet the Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Developer 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 ultra-smooth">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Laxmi Raj</h3>
              <p className="text-gray-400 text-sm mb-4">Frontend Developer</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/laxmi-raj-907363300/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/laxmiraj1833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Developer 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 ultra-smooth">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Satyam Kumar</h3>
              <p className="text-gray-400 text-sm mb-4">Backend Developer</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/satyam-kumar-3797bb278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/s4ty4mm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Satyam5167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm mt-8">
          Built using React & Node.js | © {new Date().getFullYear()} CertiChain
        </div>
      </div>
    </div>
  );
}
