import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm, ResetPasswordForm } from '../../components';
import { UserContext } from '../../Context/UserContext';

function Login() {
  const [resetPasword, setResetPassword] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (user) {
    router.replace('/');
  }

  return (
    <div className="container flex flex-col gap-3 items-center mx-auto px-10">
      <LoginForm />

      <button
        className="cursor-pointer text-blue-900 underline"
        onClick={() => setResetPassword(!resetPasword)}
        type="button"
      >
        Reset Password
      </button>

      {resetPasword && <ResetPasswordForm />}
    </div>
  );
}

export default Login;
