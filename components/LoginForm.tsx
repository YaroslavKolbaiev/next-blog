import Image from 'next/image';
import React, { useState } from 'react';
import { handleLogin, handleLoginWithGoogle, handleRegisterUser } from '../firebase/helpers';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function loginHandler() {
    setIsLoading(true);
    handleLogin(email, password);
    setEmail('');
    setPassword('');
    setIsLoading(false);
  }

  function registerHandler() {
    setIsLoading(true);
    handleRegisterUser(email, password);
    setEmail('');
    setPassword('');
    setIsLoading(false);
  }
  function registerWithGoogleHandler() {
    setIsLoading(true);
    handleLoginWithGoogle();
    setEmail('');
    setPassword('');
    setIsLoading(false);
  }
  return (
    <form className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-xl text-center font-semibold mb-4">
        {isLoading ? 'Loading...' : 'Authorization'}
      </h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
        className="text-gray-500 outline-none p-2 px-6 w-full rounded-full border-2 mb-4"
        name="email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
        className="text-gray-500 outline-none p-2 px-6 w-full rounded-full border-2 mb-4"
        name="password"
        type="password"
      />
      <div className="flex flex-col md:flex-row gap-2">
        <button
          disabled={isLoading}
          onClick={loginHandler}
          type="button"
          className="transition
            duration-500
            ease
            hover:bg-indigo-900
            bg-pink-600
            text-lg
            font-medium
            rounded-full
            text-white
            px-8
            py-3
            cursor-pointer
          "
        >
          Sign In
        </button>
        <button
          disabled={isLoading}
          onClick={registerHandler}
          type="button"
          className="transition
            duration-500
            ease
            hover:bg-indigo-900
            bg-pink-600
            text-lg
            font-medium
            rounded-full
            text-white
            px-8
            py-3
            cursor-pointer
          "
        >
          Sign Up
        </button>
        <button
          disabled={isLoading}
          onClick={registerWithGoogleHandler}
          type="button"
          className="
            text-lg
            font-medium
            rounded-full
            text-white
            px-8
            py-3
            cursor-pointer
            justify-center
            flex
            md:grow
            bg-slate-100
            hover:bg-slate-200
            transition
            duration-500
            ease
          "
        >
          <Image src="/google-ar21.svg" width={72} height={24} alt="google" />
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
