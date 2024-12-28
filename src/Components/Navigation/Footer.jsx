import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8 mt-10">
      <div className="container mx-auto text-center">
        {/* Copyright Section */}
        <p className="text-sm text-gray-400 mb-6">
          &copy; {new Date().getFullYear()} Voting System. All rights reserved.
        </p>

        {/* Social Links Section */}
        <div className="flex justify-center items-center space-x-8">
          <a
            href="https://www.linkedin.com/in/harshgoyal13/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://github.com/HarshGoyal13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <FaGithub size={28} />
          </a>
        </div>

        {/* Optional Message Section */}
        <p className="mt-6 text-gray-500 text-sm">
           &bull; Built with Love 💖
        </p>
      </div>
    </footer>
  );
};

export default Footer;
