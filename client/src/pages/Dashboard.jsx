import { Award, FileCheck, Shield, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import API_BASE from '../../apiConfig';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`${API_BASE}/users/currentUser`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user data");

      setUserName(data.name);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Welcome Section */}
        <div className="mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome  <span className="gradient-text">{userName}</span>! 👋
          </h1>
          <p className="text-xl text-gray-300">
            Manage your certificates and verify credentials with ease.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard icon={<Award className="w-8 h-8" />} title="Total Issued" value="247" change="+12%" positive />
          <StatsCard icon={<FileCheck className="w-8 h-8" />} title="Verified Today" value="89" change="+23%" positive />
          <StatsCard icon={<Shield className="w-8 h-8" />} title="Active Certificates" value="234" change="-3%" positive={false} />
          <StatsCard icon={<TrendingUp className="w-8 h-8" />} title="Success Rate" value="98.5%" change="+2%" positive />
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Issue Certificate Card */}
          <div className="glass-card rounded-3xl p-8 hover:bg-white/10 ultra-smooth hover:scale-[1.01] hover:-translate-y-0.5 group cursor-pointer animate-fadeInUp">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 group-hover:scale-105 ultra-smooth">
                <Award className="w-10 h-10 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full glass-effect text-sm text-purple-300">
                Core Feature
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300">Issue Certificate</h3>
            <p className="text-gray-300 mb-6">
              Create and issue blockchain-verified certificates. Each certificate is permanently recorded and instantly verifiable.
            </p>

            <ul className="space-y-2 mb-6 text-gray-300">
              <li>• Instant blockchain registration</li>
              <li>• Custom certificate templates</li>
              <li>• Bulk issuance support</li>
            </ul>

            <button
              onClick={() => navigate("/issue-certificate", { viewTransition: true })}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold hover:from-purple-500 hover:to-purple-700 ultra-smooth hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Issue New Certificate</span>
            </button>
          </div>

          {/* Verify Certificate Card */}
          <div className="glass-card rounded-3xl p-8 hover:bg-white/10 ultra-smooth hover:scale-[1.01] hover:-translate-y-0.5 group cursor-pointer animate-fadeInUp delay-100">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 group-hover:scale-105 ultra-smooth">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full glass-effect text-sm text-blue-300">
                Core Feature
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300">Verify Certificate</h3>
            <p className="text-gray-300 mb-6">
              Instantly verify the authenticity of any certificate using its unique blockchain ID or QR code.
            </p>

            <ul className="space-y-2 mb-6 text-gray-300">
              <li>• Real-time blockchain verification</li>
              <li>• QR code scanning support</li>
              <li>• Detailed certificate information</li>
            </ul>

            <button
              onClick={() => navigate('/verify-certificate', { viewTransition: true })}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-500 hover:to-blue-700 ultra-smooth hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileCheck className="w-5 h-5" />
              <span>Verify Certificate</span>
            </button>
          </div>
        </div>

        {/* Key Features (kept minimal for smoother scroll) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Certificate Templates" description="Access and customize professional templates for various uses." color="from-pink-600 to-rose-600" />
          <FeatureCard title="Bulk Operations" description="Issue or verify multiple certificates at once with batch tools." color="from-emerald-600 to-green-600" />
          <FeatureCard title="Analytics Dashboard" description="Track certificate issuance and verification in real time." color="from-amber-600 to-orange-600" />
        </div>

        {/* Info Banner */}
        <div className="mt-10 glass-card rounded-2xl p-6 border-l-4 border-purple-500 animate-fadeInUp">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold mb-1">Platform Features</h4>
              <p className="text-gray-300 text-sm">
                All certificates issued through CertiChain are secured by blockchain technology, ensuring permanent, tamper-proof records that can be shared and verified instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, title, value, change, positive }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:bg-white/10 ultra-smooth hover:scale-105 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:scale-105">
          {icon}
        </div>
        <span className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  );
}

function FeatureCard({ title, description, color }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:bg-white/10 ultra-smooth hover:scale-105 cursor-pointer group">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} mb-4 group-hover:scale-105`}></div>
      <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
