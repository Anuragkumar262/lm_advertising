import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react"; // install lucide-react

const logo = new URL("../../public/logo.png", import.meta.url).href;

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Connect", to: "/connect" },
  ];

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
       className={`fixed w-full flex justify-center z-50 transition-all duration-500 ${
        show ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <nav className="relative flex items-center justify-between w-[92%] md:w-[80%] px-6 py-3 
        bg-white/10 backdrop-blur-xl border border-white/20 
        rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.4)]">

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 blur-xl"></div>

        {/* Logo */}
        <h1 className="relative flex items-center gap-3 text-white font-semibold tracking-wide text-sm md:text-base">
          <span className="flex items-center justify-center rounded-full p-1 shadow-md">
            <img src={logo} alt="logo" className="h-8 w-8" />
          </span>
          <span className="font-bold">
            <span className="text-red-500">L</span>
            <span className="text-white">M</span> ADVERTISING
          </span>
        </h1>

        {/* Desktop Menu */}
        <ul className="relative hidden md:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.label} className="relative px-3 py-1 group">
              {location.pathname === item.to && (
                <span className="absolute inset-0 bg-red-600 rounded-full -z-10"></span>
              )}

              <Link
                to={item.to}
                className={`transition ${
                  location.pathname === item.to
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {item.label}
              </Link>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* CTA (desktop only) */}
        <button className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition hover:scale-105">
          Get a Quote
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 w-[90%] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden transition-all duration-500 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium ${
              location.pathname === item.to
                ? "text-red-500"
                : "text-gray-300"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-semibold">
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default Navbar;
