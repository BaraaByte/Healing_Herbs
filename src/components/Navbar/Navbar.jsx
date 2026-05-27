import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import Logout from "../Logout/Logout";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import subLogo from "../../assets/sub-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userTokenAccess } = useContext(userContext);

  const navItems = [
    { path: "/", label: "الرئيسية", icon: "fa-house", end: true },
    { path: "/dashboard", label: "لوحة التحكم", icon: "fa-gauge", protected: true },
    { path: "/library", label: "المكتبة", icon: "fa-book" },
    { path: "/stories", label: "القصص التراثية", icon: "fa-feather" },
    { path: "/community/recipes", label: "المجتمع", icon: "fa-users" },
  ];

  const filteredNavItems = navItems.filter((item) => !item.protected || userTokenAccess);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
      isActive
        ? "bg-primary text-white"
        : "text-primary hover:bg-primary-light hover:text-white"
    }`;

  const AuthLinks = () => (
    <NavLink
      to="/login"
      className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
    >
      تسجيل دخول
    </NavLink>
  );

  return (
    <nav className="fixed top-0 inset-x-0 z-50 font-cairo bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={subLogo} alt="subLogo" className="w-36" />
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {filteredNavItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.end} className={linkClass}>
              <i className={`fa-solid ${item.icon} text-xs`}></i>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 font-[var(--font-sans)]">
          <LanguageSwitcher />
          {userTokenAccess ? <Logout /> : <AuthLinks />}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-[var(--color-primary)] bg-[var(--color-primary-light)] hover:text-white transition-all"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 animate-slideDown font-[var(--font-noto-arabic)]">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-white"
                }`
              }
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </NavLink>
          ))}

          <div className="space-y-3">
            <LanguageSwitcher />
            <div className="pt-4 border-t border-[var(--color-primary-light)]">
              {userTokenAccess ? <Logout /> : <AuthLinks />}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
