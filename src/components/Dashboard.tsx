
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import RadarView from "./RadarView";
import FriendsList from "./FriendsList";
import ControlPanel from "./ControlPanel";
import { useProfile } from "@/context/ProfileContext";

const Dashboard: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center text-blueBuddy-800 mb-2">
            Hello, {profile?.name || "Friend"}
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Find your buddies without internet connection
          </p>
          <RadarView />
        </CardContent>
      </Card>

      <FriendsList />
      <ControlPanel />
    </div>
  );
};

export default Dashboard;
