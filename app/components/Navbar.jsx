import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      window.location.href = '/'; 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar flex justify-between items-center">
      <ul className="flex items-center">
        <li className="mr-3">
          <Link href="/">
            <button className="nav-button">Home</button>
          </Link>
        </li>
        <li className="mr-3">
          <Link href="/todo">
            <button className="nav-button">To-Do APP</button>
          </Link>
        </li>
      </ul>
      <div className="user-info flex items-center">
        {user ? (
          <>
            <p className="mr-3">Welcome, {user.displayName}</p>
            <button className="nav-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            {/* <li className="mr-3">
              <Link href="/signup">
                <button className="nav-button">Signup</button>
              </Link>
            </li> */}
            <button className="nav-button" onClick={googleSignIn}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
