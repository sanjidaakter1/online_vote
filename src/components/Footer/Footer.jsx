import React, { useState } from "react";
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "../Logo/Logo";

const Footer = () => {
  const [message, setMessage] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  const appPlatforms = ["Android", "iPhone", "Mac/PC", "Web Browser"];

  const handleSend = () => {
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage("");
    }
  };

  return (
    <footer className="bg-[#202c33] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* <p className="text-gray-300 text-sm sm:text-base"> */}

          <p className="text-gray-300 text-[14px] md:text-[16px]">
            Connect instantly with friends and family. Simple, reliable, and
            secure messaging.
          </p>

          {/* <div className="flex gap-4 mt-2 justify-center md:justify-start"> */}

          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="text-gray-300 border-b border-transparent hover:border-gray-300 transition pb-1"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 border-b border-transparent hover:border-gray-300 transition pb-1"
            >
              <Twitter size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 border-b border-transparent hover:border-gray-300 transition pb-1"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="text-gray-300 border-b border-transparent hover:border-gray-300 transition pb-1"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-green-500 font-semibold text-[16px] md:text-[18px]">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="text-gray-300 border-b border-transparent hover:border-gray-300 transition text-[14px] md:text-[16px]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-green-500 font-semibold text-[16px] md:text-[18px]">
            Use Chat App
          </h3>
          <ul className="flex flex-col gap-2">
            {appPlatforms.map((platform) => (
              <li key={platform}>
                <a
                  href="#"
                  className="text-gray-300 border-b border-transparent hover:border-gray-300 transition text-[14px] md:text-[16px]"
                >
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 sm:block md:flex">
          <h3 className="text-green-500 font-semibold text-[16px] md:text-[18px]">
            Send us a message
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Have a question or feedback? Drop us a message and we will get back
            to you.
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-500 focus:outline-none focus:border-green-500 text-black placeholder-gray-500 shadow-sm"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full flex items-center gap-2 transition shadow-md hover:shadow-lg w-full md:w-auto"
            >
              <Send size={20} />
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-5 text-center text-gray-400 text-[14px] md:text-[16px]">
        &copy; {new Date().getFullYear()} DashChat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
