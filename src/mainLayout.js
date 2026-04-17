import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Outlet context={{ theme, toggleTheme }} />
    </>
  );
};

export default MainLayout;
