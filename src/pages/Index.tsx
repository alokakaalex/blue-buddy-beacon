
import React from 'react';
import { ProfileProvider, useProfile } from "@/context/ProfileContext";
import { BluetoothProvider } from "@/context/BluetoothContext";
import ProfileSetup from "@/components/ProfileSetup";
import Dashboard from "@/components/Dashboard";
import { MapPin, User, Users } from "lucide-react";

const AppContent: React.FC = () => {
  const { isProfileSetup } = useProfile();

  if (!isProfileSetup) {
    return <ProfileSetup />;
  }

  return <Dashboard />;
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blueBuddy-50 to-blueBuddy-100">
      <header className="bg-white shadow">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-blueBuddy-600 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blueBuddy-600 to-blueBuddy-800 text-transparent bg-clip-text">
              Blue Buddy Beacon
            </span>
          </div>
          <div className="flex gap-2">
            <div className="bg-blueBuddy-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blueBuddy-600" />
            </div>
            <div className="bg-blueBuddy-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-blueBuddy-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6">
        <ProfileProvider>
          <BluetoothProvider>
            <AppContent />
          </BluetoothProvider>
        </ProfileProvider>
      </main>

      <footer className="max-w-7xl mx-auto py-6 text-center text-sm text-blueBuddy-600">
        <p>Blue Buddy Beacon &copy; 2025 - Find Friends Offline</p>
      </footer>
    </div>
  );
};

export default Index;
