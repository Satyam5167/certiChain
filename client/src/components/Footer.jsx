import { Shield, Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="glass-effect">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">CertiChain</span>
              </div>
              <p className="text-gray-400 text-sm">
                Secure blockchain-based certificate issuance and verification platform.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 smooth-transition hover:translate-x-1 inline-block">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-lg glass-card text-gray-400 hover:text-purple-400 hover:bg-white/10 smooth-transition transform hover:scale-110 hover:-translate-y-1 hover:rotate-6">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg glass-card text-gray-400 hover:text-purple-400 hover:bg-white/10 smooth-transition transform hover:scale-110 hover:-translate-y-1 hover:rotate-6">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg glass-card text-gray-400 hover:text-purple-400 hover:bg-white/10 smooth-transition transform hover:scale-110 hover:-translate-y-1 hover:rotate-6">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm">
              © 2025 CertiChain. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
