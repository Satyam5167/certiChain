import { Shield, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/", { replace: true, viewTransition: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        
        setIsVisible(false);
      } else {
        
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10 transform transition-transform duration-500 ${
          isVisible ? "translate-y-0 shadow-lg shadow-black/30" : "-translate-y-full"
        }`}
      >
        <div className="glass-effect">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              viewTransition
              className="flex items-center space-x-2 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 group-hover:scale-110 group-hover:rotate-3 ultra-smooth">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white ultra-smooth">
                CertiChain
              </span>
            </Link>

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden text-white hover:scale-110 ultra-smooth"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Navigation (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/about"
                viewTransition
                className="text-gray-300 hover:text-white ultra-smooth relative group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full ultra-smooth"></span>
              </Link>

              {!isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate("/login", { viewTransition: true })}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 ultra-smooth transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40"
                  >
                    Login
                  </button>

                  <button
                    onClick={() =>
                      navigate("/register", { viewTransition: true })
                    }
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 ultra-smooth transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/40"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    viewTransition
                    className="px-6 py-2 rounded-lg glass-card text-white font-medium hover:bg-white/10 ultra-smooth transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 ultra-smooth transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white ultra-smooth"
              >
                About Us
              </Link>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login", { viewTransition: true });
                    }}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 ultra-smooth"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/register", { viewTransition: true });
                    }}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 ultra-smooth"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-6 py-2 rounded-lg glass-card text-white font-medium hover:bg-white/10 ultra-smooth"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-500 hover:to-blue-500 ultra-smooth"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent overlap */}
      <div className="h-20"></div>
    </>
  );
}