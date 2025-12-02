import { Shield, CheckCircle, Lock, Award, ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6 animate-scaleIn">
              <div className="p-4 rounded-2xl glass-card ultra-smooth">
                <Shield className="w-12 h-12 text-purple-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeInUp">
              Issue and Verify <br />
              <span className="gradient-text">Blockchain Certificates</span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeInUp delay-200">
              Create tamper-proof, verifiable certificates powered by blockchain technology. 
              Build trust and transparency for your organization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 ultra-smooth flex items-center justify-center space-x-2 group">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ultra-smooth group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-3 rounded-xl glass-card text-white font-semibold hover:bg-white/10 ultra-smooth">
                View Demo
              </button>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Immutable Records"
              description="Certificates are permanently recorded on blockchain, ensuring authenticity and integrity."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Verification"
              description="Verify any certificate in seconds with our secure blockchain-powered system."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Digital Credentials"
              description="Issue easily shareable, verifiable digital certificates worldwide."
            />
          </div>

          {/* Why Choose CertiChain */}
          <div className="glass-card rounded-3xl p-8 mb-16 animate-fadeInUp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Why Choose CertiChain?
                </h2>
                <p className="text-gray-300 mb-4 text-base">
                  CertiChain simplifies how institutions issue and verify credentials using blockchain.
                  Our platform ensures complete transparency, fraud prevention, and cost-efficient verification.
                </p>
                <div className="space-y-3">
                  <BenefitItem text="Tamper-proof and verifiable certificates" />
                  <BenefitItem text="Instant global verification" />
                  <BenefitItem text="Cost-effective and scalable" />
                </div>
              </div>

              {/* Smaller visual illustration (less lag) */}
              <div className="flex justify-center">
                <div className="rounded-2xl glass-card p-6 w-48 h-48 flex items-center justify-center animate-float">
                  <Shield className="w-20 h-20 text-purple-400/60" />
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard number="25K+" label="Certificates Issued" />
            <StatCard number="99.9%" label="Verification Accuracy" />
            <StatCard number="500+" label="Trusted Organizations" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:bg-white/10 ultra-smooth transform hover:scale-105 group">
      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 w-fit mb-3 group-hover:scale-110 ultra-smooth">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-center space-x-2 group">
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-125 ultra-smooth" />
      <span className="text-gray-300 text-sm group-hover:text-white">{text}</span>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="glass-card rounded-2xl p-6 text-center hover:bg-white/10 ultra-smooth transform hover:scale-105 group">
      <div className="text-3xl font-bold text-white mb-1 gradient-text group-hover:scale-110">
        {number}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
