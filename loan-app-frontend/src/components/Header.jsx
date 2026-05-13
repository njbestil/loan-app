import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Navbar } from "flowbite-react";
import { HiOutlineLogout } from "react-icons/hi";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the string from localStorage and parse it back into a JSON object
  const storedUser = localStorage.getItem('user');
  var user = {};

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    console.log("No user data found in localStorage.");
  }

  const handleSignOut = () => {
    localStorage.clear();  // Clears all stored data
    navigate('/login'); // Redirect to login
  };

  const getActive = (path) => {
    const excludedPaths = ["/about", "/services", "/contact"];
    const { pathname } = location;
    if (path === "/home") {
      return !excludedPaths.includes(pathname);
    }
    return pathname === path;
  };

  return (
    <Navbar fluid className='shadow-sm mb-10'>
      <Navbar.Brand href="/home">
        <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="App Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Rural Bank of Hindang</span>
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        <h1 className="mr-5 font-bold capitalize">{user.fname}</h1>
        <Button color="success" onClick={handleSignOut}>
          Sign Out <HiOutlineLogout className="ml-2 h-5 w-5" />
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/home" active={getActive('/home')}>Home</Navbar.Link>
        <Navbar.Link href="/about" active={getActive('/about')}>About</Navbar.Link>
        <Navbar.Link href="/services" active={getActive('/services')}>Services</Navbar.Link>
        <Navbar.Link href="/contact" active={getActive('/contact')}>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
