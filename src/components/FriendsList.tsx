
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBluetooth, Friend } from "@/context/BluetoothContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FriendItem: React.FC<{ friend: Friend }> = ({ friend }) => {
  const getDistanceColor = () => {
    switch (friend.distance) {
      case 'near':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'far':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDistanceLabel = () => {
    switch (friend.distance) {
      case 'near':
        return 'Very Close';
      case 'medium':
        return 'Nearby';
      case 'far':
        return 'Far Away';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blueBuddy-50 transition-colors">
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-blueBuddy-200">
          <AvatarFallback className="bg-blueBuddy-500 text-white">
            {friend.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span 
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getDistanceColor()} border-2 border-white`} 
          title={getDistanceLabel()}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{friend.name}</p>
        <p className="text-sm text-gray-500 truncate">{getDistanceLabel()}</p>
      </div>
      <div className="text-xs text-gray-400">
        {new Date(friend.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

const FriendsList: React.FC = () => {
  const { discoveredFriends, isScanning } = useBluetooth();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-xl text-blueBuddy-800">
          Nearby Friends {isScanning && <span className="ml-2 text-xs text-blueBuddy-600 animate-pulse">Scanning...</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          {discoveredFriends.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
              <p>No friends discovered yet.</p>
              {isScanning && <p className="text-sm">Keep scanning to find nearby buddies.</p>}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {discoveredFriends.map(friend => (
                <FriendItem key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FriendsList;
