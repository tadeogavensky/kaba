"use client";
import { useAuth } from "@/contexts/AuthContext";
import Client from "@/components/account/Client";
import Worker from "@/components/account/Worker";

const Account = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <button
        className="bg-red-500 text-white px-3 py-2 rounded-2xl font-heading font-bold shadow-md"
        onClick={() => {
          logout();
        }}
      >
        Sign Out
      </button>
      {user?.role == "client" && <Client user={user} />}

      {user?.role == "worker" && <Worker user={user} />}
    </div>
  );
};

export default Account;
