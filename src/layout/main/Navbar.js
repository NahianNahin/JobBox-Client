import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { email, role } = useSelector(state => state.auth.user);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => dispatch(logOut()))
      .catch(error => console.log(error))
  }

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>

        {
          email
            ?
            <button
              onClick={() => handleLogOut()}
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
            >
              Log Out
            </button>
            :
            <li>
              <Link
                className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
                to='/login'
              >
                Login
              </Link>
            </li>
        }
        {
          !role && email && <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/register'
            >
              Get Started
            </Link>
          </li>
        }
        {
          role && email && <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/dashboard'
            >
              Dashboard
            </Link>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
