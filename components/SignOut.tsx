"use client";

import { useAuth } from "@/contexts/AuthContext";
import { BiLogOut } from "react-icons/bi";

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
      <BiLogOut/>
      Sign out
    </button>
  );
};

export default SignOut;
