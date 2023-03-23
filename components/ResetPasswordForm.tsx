import React, { useState } from 'react';
import { handleSendResetPasswordEmail } from '../firebase/helpers';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');

  function resetPasswordHandler() {
    handleSendResetPasswordEmail(email);
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
        className="text-gray-500 outline-none p-2 px-6 w-full rounded-full border-2 mb-4"
        name="email"
        type="email"
      />
      <button
        onClick={resetPasswordHandler}
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
        type="button"
      >
        Send
      </button>
    </div>
  );
}

export default ResetPasswordForm;
