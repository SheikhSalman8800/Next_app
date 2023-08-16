import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      window.location.href = '/'; // Redirect to the home page after signing out
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <ul>
        <li className="mr-5">
          <button className="nav-button">
            <Link href="/">Home</Link>
          </button>
        </li>
        {user && (
          <li className="mr-5">
            <Link href="/todo">
              <button className="nav-button">To-Do App</button>
            </Link>
          </li>
        )}
      </ul>
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.displayName}</p>
          <button className="nav-button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="user-info">
          <button className="nav-button" onClick={googleSignIn}>
            Login
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Navbar;
