"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const AlertWorker = () => {
  const { user } = useAuth();
  return (
    <div className="mt-6">
      {user?.role == "worker" &&
        user.worker?.available == false &&
        !user.worker?.rate &&
        !user.worker?.service && (
          <h1 className="text-center font-body font-semibold text-xs bg-primary  text-white shadow-lg p-6 rounded-lg">
            Hi {user.firstName}, to be visible for our Kaba Clients please add a
            rate, a service and set yourself as available for working!
          </h1>
        )}
    </div>
  );
};

export default AlertWorker;
