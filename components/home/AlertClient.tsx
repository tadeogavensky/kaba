"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const AlertWorker = () => {
  const { user } = useAuth();
  return (
    <div className="mt-6">
      {user?.role == "client" && user.active === false && (
        <h1 className="text-center font-body font-semibold text-xs bg-primary  text-white shadow-lg p-6 rounded-lg">
          Hi {user.firstName}, to access key feautures as booking KabaProps, please confirm your account via the email we've sent you!
        </h1>
      )}
    </div>
  );
};

export default AlertWorker;
