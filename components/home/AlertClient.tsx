"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const AlertWorker = () => {
  const { user } = useAuth();
  return (
    <div className="mt-6">
      {user?.role == "client" && (user?.active === false || !user?.phone) ? (
        <h1 className="text-center font-body font-semibold text-xs bg-primary  text-white shadow-lg p-6 rounded-lg">
          Hi {user.firstName}, to access key feautures as booking KabaProps,
          please confirm your account via the email we've sent you and add a
          phone!
        </h1>
      ) : null}
    </div>
  );
};

export default AlertWorker;
