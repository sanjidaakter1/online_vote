import React from "react";
import { Link, NavLink } from "react-router";
import { ChevronDown, MessageCircle } from "lucide-react";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-10 sticky top-0 z-50">
      {/* Mobile View */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                  isActive
                      ? "bg-green-100 text-green-700"
                      : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </div>

      {/* Desktop View - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  }`
                }
              >
                {link.name}
                {link.name === "About" && (
                  <ChevronDown size={22} className="ml-1" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Button */}
      <div className="navbar-end">
        <Link to="/#" className="btn btn-outline btn-success rounded-full flex items-center gap-2 px-5 lg:px-7 py-5 hover:bg-secondary hover:text-white transition text-[16px] md:text-[18px] lg:text-[20px]">
          <MessageCircle size={24} />
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
