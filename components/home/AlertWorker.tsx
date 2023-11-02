"use client";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useEffect } from "react";

const AlertWorker = () => {
  const { user } = useAuth();

  const [alertMessages, setAlertMessages] = useState<string[]>([]);

  useEffect(() => {
    const newAlertMessages: string[] = [];

    if (user?.role === "worker") {
      if (user?.worker?.available === false) {
        newAlertMessages.push("Set yourself as available for working.");
      }
      if (!user?.phone) {
        newAlertMessages.push("Add a phone number.");
      }
      if (!user?.worker?.rate) {
        newAlertMessages.push("Add a rate.");
      }
      if (!user?.worker?.service) {
        newAlertMessages.push("Add a service.");
      }
    }

    setAlertMessages(newAlertMessages);
  }, [user]);

  return (
    <div className="mt-6">
      <h1 className="font-body text-lg text-center">
        Your active service <span className="font-bold">{user?.worker?.service?.name}</span>
      </h1>
      {alertMessages.length > 0 && (
        <div className="text-center font-body font-semibold text-xs bg-primary text-white shadow-lg p-6 rounded-lg">
          Hi {user?.firstName}, to be visible for our Kaba Clients, please:
          <ul>
            {alertMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertWorker;
