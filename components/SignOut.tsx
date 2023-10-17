"use client";

import { useAuth } from "@/contexts/AuthContext";

interface Props {
  className: string;
}

const SignOut = ({ className }: { className: string }) => {
  const { logout } = useAuth();
  return (
    <button
      onClick={() => {
        logout();
      }}
      className={className}
    >
      Sign out
    </button>
  );
};

export default SignOut;
