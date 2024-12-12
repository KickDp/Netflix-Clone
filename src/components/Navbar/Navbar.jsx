import React, { useEffect, useRef, useState } from "react";
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout().catch((err) => {
      console.error("Logout failed: ", err);
    });
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Bell Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img
            src={caret_icon}
            alt="Caret Icon"
            onClick={toggleDropdown}
            className="dropdown-toggle"
          />
          {dropdownVisible && (
            <div className="dropdown">
              <p onClick={handleLogout}>Sign out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
