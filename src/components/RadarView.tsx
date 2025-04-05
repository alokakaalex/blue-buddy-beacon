
import React from 'react';
import { useBluetooth, Friend } from "@/context/BluetoothContext";
import { useProfile } from "@/context/ProfileContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const RadarView: React.FC = () => {
  const { discoveredFriends, isScanning } = useBluetooth();
  const { profile } = useProfile();

  // Position friends on the radar based on their RSSI (signal strength)
  const positionFriend = (rssi: number) => {
    // RSSI values are negative, with closer devices having higher (less negative) values
    // -50 is very close, -100 is far away
    const distance = Math.min(Math.max((-rssi - 50) / 50, 0), 1); // Normalize between 0 and 1
    const radius = 40 + distance * 35; // Position between 40% and 75% from center
    const angle = Math.random() * 2 * Math.PI; // Random angle
    
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className="relative w-full h-72 rounded-full bg-blueBuddy-100 border-4 border-blueBuddy-200 overflow-hidden">
      {/* Radar circles */}
      <div className="absolute inset-1/4 rounded-full border-2 border-blueBuddy-200 opacity-70" />
      <div className="absolute inset-2/4 rounded-full border-2 border-blueBuddy-200 opacity-70" />
      <div className="absolute inset-3/4 rounded-full border-2 border-blueBuddy-200 opacity-70" />
      
      {/* Center point (you) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Avatar className="h-12 w-12 border-4 border-blueBuddy-500 bg-white shadow-lg">
          <AvatarFallback className="bg-blueBuddy-500 text-white">
            {profile?.name.charAt(0) || "Me"}
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* Scanning animation */}
      {isScanning && (
        <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-full h-full rounded-full bg-blueBuddy-400 opacity-20 animate-radar-ping" />
        </div>
      )}
      
      {/* Friends on the radar */}
      {discoveredFriends.map((friend) => {
        const position = positionFriend(friend.rssi);
        
        return (
          <div 
            key={friend.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              transition: "all 0.5s ease-out"
            }}
          >
            <Avatar className="h-8 w-8 border-2 border-white shadow">
              <AvatarFallback 
                className={
                  friend.distance === 'near' ? 'bg-green-500 text-white' :
                  friend.distance === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }
              >
                {friend.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-white/90 px-1.5 py-0.5 rounded text-blueBuddy-800">
              {friend.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RadarView;
