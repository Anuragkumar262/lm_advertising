import { FileText } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";

const logo = new URL("../../public/logo.png", import.meta.url).href;
const DESKTOP_BREAKPOINT = 1024;

const Navbar = ({ theme = "light", onToggleTheme }) => {
  // Controls navbar visibility on scroll
  const [show, setShow] = useState(true);

  // Stores last scroll position
  const lastScrollYRef = useRef(0);

  // Mobile menu toggle state
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // Navigation items
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Products", to: "/our-products" },
    { label: "Our Clients", to: "/our-clients" },
    { label: "Locations", to: "/our-locations" },
    { label: "Reach Us", to: "/reach-us" },
  ];

  // Show navbar when scrolling up, hide when scrolling down
  // Show navbar when scrolling up, hide when scrolling down (desktop only)
  useEffect(() => {
    const controlNavbar = () => {
      const currentY = window.scrollY;
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

      if (!isDesktop) {
        setShow(true);
        lastScrollYRef.current = currentY;
        return;
      }

      setShow(currentY <= lastScrollYRef.current);
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  // Close menu automatically on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Ensure menu closes when switching from mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    const openPDF = () => {
      window.open("https://drive.google.com/uc?export=view&id=1pv8hcb-948Z1QSsPNLd0d7q6fQVafVbX");
    };
    return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 lg:px-0 pointer-events-none transition-all duration-500 ${
        show ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* ================= NAVBAR CONTAINER ================= */}
      <nav
        className={`
        pointer-events-auto relative flex items-center justify-between
        w-full max-w-[520px] lg:max-w-none lg:w-[95%] lg:max-w-[1200px] px-3 sm:px-4 lg:px-6 py-2.5 lg:py-3
        ${theme === "dark" ? "bg-black/60 border-white/15" : "bg-white/70 border-gray-200/50"}
        backdrop-blur-xl
        rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)]
      `}
      >
        {/* ===== Light Glow Effect (subtle, not dark) ===== */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 blur-xl pointer-events-none"></div>

        {/* ================= LOGO ================= */}
        <h1 className={`relative flex items-center gap-1.5 lg:gap-3 font-semibold tracking-wide text-xs sm:text-sm lg:text-base ${theme === "dark" ? "text-white" : "text-black"}`}>
          <span className="flex items-center justify-center rounded-full p-1 shadow-sm">
            <img src={logo} alt="logo" className="h-7 w-7 lg:h-8 lg:w-8" />
          </span>

          {/* Brand Name */}
          <span className="font-bold hidden sm:inline">
            <span className="text-red-500">L</span>
            <span className={theme === "dark" ? "text-white" : "text-black"}>M ADVERTISING</span>
          </span>
          <span className="font-bold sm:hidden">
            <span className="text-red-500">L</span>
            <span className={theme === "dark" ? "text-white" : "text-black"}>M</span>
          </span>
        </h1>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="relative hidden lg:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.label} className="relative px-3 py-1 group">
              
              {/* Active background pill */}
              {location.pathname === item.to && (
                <span className="absolute inset-0 bg-red-500 rounded-full -z-10"></span>
              )}

              {/* Nav link */}
              <Link
                to={item.to}
                className={`transition ${
                  location.pathname === item.to
                    ? "text-white"
                    : theme === "dark"
                    ? "text-gray-200 group-hover:text-white"
                    : "text-gray-700 group-hover:text-black"
                }`}
              >
                {item.label}
              </Link>

              {/* Hover underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* ================= CTA BUTTON ================= */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`h-10 w-10 rounded-full border transition flex items-center justify-center ${
              theme === "dark"
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="
            bg-red-500 hover:bg-red-600
            text-white
            px-5 py-2 rounded-full
            text-xs lg:text-sm font-semibold
            transition transform hover:scale-105
            shadow-sm hover:shadow-md
          "
          >
            <FileText onClick={openPDF}/>
          </button>
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className={`lg:hidden p-1.5 ${theme === "dark" ? "text-white" : "text-black"}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        id="mobile-menu"
        className={`
        pointer-events-auto absolute top-[84px] left-3 right-3 sm:left-4 sm:right-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 w-auto lg:w-[80%] lg:max-w-[1200px]
        ${theme === "dark" ? "bg-black/75 border-white/15" : "bg-white/80 border-gray-200/50"}
        backdrop-blur-xl
        rounded-2xl p-5
        flex flex-col gap-4 lg:hidden
        shadow-[0_8px_25px_rgba(0,0,0,0.08)]
        origin-top transition-all duration-300
        ${
          menuOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-3 pointer-events-none"
        }
      `}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium ${
              location.pathname === item.to
                ? "text-red-500"
                : theme === "dark"
                ? "text-gray-100"
                : "text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <button
          type="button"
          onClick={onToggleTheme}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            theme === "dark"
              ? "border-white/20 bg-white/10 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>

        {/* Mobile CTA */}
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
          Download Broshure
        </button>
      </div>
    </div>
  );
};

export default Navbar;
