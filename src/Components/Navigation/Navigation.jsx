import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/UseWeb3Context"
import logo from "../../assets/logo5.png"

const Navigation = () => {
  const { handelwallet, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const navigate = useNavigate();

  // Check if token is present in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'token' with your actual token key
    if (token) {
      setIsTokenPresent(true); // Token is present, show all links
    } else {
      setIsTokenPresent(false); // Token is not present, show connect wallet
    }
  }, []);

  // Handle logout by removing the token from localStorage and updating the state
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
  
    // Update the state to reflect the token's absence
    setIsTokenPresent(false);
  
    // Immediately navigate to the home page
    navigate('/');
  
    // If needed, force a page refresh (uncommon but may help in rare cases)
    window.location.href = '/';
  };
  
  
  useEffect(() => {
    // Navigate only if selectedAccount is updated and the user is on the homepage
    if (selectedAccount && window.location.pathname === '/') {
      navigate('/register-candidate');
    }
  }, [selectedAccount]);
  


  return (
<main>
  <nav className="flex justify-between items-center px-6 lg:px-12 py-6 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50 relative font-sans">
    {/* Logo Section */}
    <div className="flex items-center gap-4 lg:gap-8">
      <Link to="/" aria-label="Voting System Home">
        <img
          src={logo} // Replace with your actual logo path
          alt="Voting System Logo"
          className="h-10 lg:h-12 object-contain hover:opacity-90 transition duration-300"
        />
      </Link>
    </div>

    {/* Navigation Links */}
    <div className="hidden lg:flex flex-grow items-center justify-center">
      <div className="flex-grow flex items-center justify-center gap-8 text-white font-medium">
        {isTokenPresent ? (
          <>
            <Link
              to="/register-voter"
              className="hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Register Voter"
            >
              Register Voter
            </Link>
            <Link
              to="/register-candidate"
              className="hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Register Candidate"
            >
              Register Candidate
            </Link>

            <Link
              to="/election-commision"
              className="hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Election Commission"
            >
              Election Commission
            </Link>
            <Link
              to="/token-marketplace"
              className="hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Token Marketplace"
            >
              Token Marketplace
            </Link>
            <Link
              onClick={handleLogout}
              className="hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Logout"
            >
              Logout
            </Link>
          </>
        ) : (
          <div className="ml-auto">
            <button
              onClick={handelwallet}
              className="bg-gradient-to-r from-teal-500 to-teal-800 text-white px-6 py-2 rounded-full shadow-lg hover:from-teal-800 hover:to-teal-1000 transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Connect Wallet"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Responsive Menu Button */}
    <div className="lg:hidden">
      <button
        className="text-white text-xl focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  </nav>
</main>

  );
};

export default Navigation;
