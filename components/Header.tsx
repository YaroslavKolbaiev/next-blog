import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../Context/UserContext';
import { FirebaseAuthService } from '../firebase/FirebaseAuthService';

function Header() {
  const { user } = useContext(UserContext);

  function handleLogOut() {
    FirebaseAuthService.logOutUser();
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer drop-shadow-md font-bold text-4xl text-white">
              NEXT BLOG
            </span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-start flex-col gap-3 md:flex-row md:items-center md:float-right">
            <span className="text-md text-blue-800">{user.email}</span>
            <Link href="/createPost">
              <button
                type="button"
                className="cursor-pointer text-md rounded-md text-white bg-slate-600 p-2 hover:bg-slate-400 transition duration-200 ease"
              >
                Create Post
              </button>
            </Link>
            <button
              onClick={handleLogOut}
              type="button"
              className="text-md rounded-md text-white bg-slate-600 p-2 hover:bg-slate-400 transition duration-200 ease"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className="cursor-pointer text-lg text-blue-800 md:float-right hover:underline"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
