import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Building2 } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { path: "/home/features", label: "Features" },
    { path: "/home/how-it-works", label: "How It Works" },
    { path: "/home/about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex items-center justify-between h-18 md:px-20 px-16 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-[#180900c3] backdrop-blur-xl shadow-2xl border-[#3b2f2a]"
            : "border-transparent"
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer text-amber-50"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-orange-800 rounded-xl flex items-center justify-center shadow-[#361000] shadow-sm text-2xl">
            <Icon icon="icon-park-solid:building-two" />
          </div>
          <p className="text-xl md:text-2xl days-one whitespace-nowrap">
            Urban<span className="text-orange-500">Enclaves</span>
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-[#c45e32] font-semibold"
                    : "text-[#ffdacc] font-light hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-1.5 text-sm transition-all duration-200 text-[#c45e32] border font-bold border-[#c45e32] rounded-full hover:bg-[#c45e32] hover:text-black"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-1.5 bg-[#c45e32] border border-[#c45e32] text-black text-sm font-bold rounded-full hover:bg-transparent hover:text-[#c45e32] transition-all shadow-lg active:scale-95"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
