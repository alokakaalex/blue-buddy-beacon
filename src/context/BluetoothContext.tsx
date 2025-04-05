
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface Friend {
  id: string;
  name: string;
  distance: 'near' | 'medium' | 'far';
  lastSeen: Date;
  rssi: number;
}

interface BluetoothContextType {
  isScanning: boolean;
  isBroadcasting: boolean;
  discoveredFriends: Friend[];
  startScanning: () => void;
  stopScanning: () => void;
  startBroadcasting: () => void;
  stopBroadcasting: () => void;
  bluetoothAvailable: boolean;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

// Mock data for preview purposes - in a real app, this would be populated from Bluetooth scanning
const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Alice', distance: 'near', lastSeen: new Date(), rssi: -50 },
  { id: '2', name: 'Bob', distance: 'medium', lastSeen: new Date(), rssi: -70 },
  { id: '3', name: 'Charlie', distance: 'far', lastSeen: new Date(), rssi: -85 },
];

export const BluetoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [discoveredFriends, setDiscoveredFriends] = useState<Friend[]>([]);
  const [bluetoothAvailable, setBluetoothAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Bluetooth is available in this browser
    if ('bluetooth' in navigator) {
      setBluetoothAvailable(true);
    } else {
      console.log('Bluetooth not available in this browser');
      toast({
        title: "Bluetooth Not Available",
        description: "Your device doesn't support Bluetooth or permissions were denied.",
        variant: "destructive"
      });
    }

    // In a real app, we would set up the necessary event listeners for Bluetooth here
    // For the preview, we're using mock data
    setDiscoveredFriends(MOCK_FRIENDS);
  }, []);

  const startScanning = () => {
    if (!bluetoothAvailable) {
      toast({
        title: "Cannot Start Scanning",
        description: "Bluetooth is not available on this device.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, we would use Web Bluetooth API here
    setIsScanning(true);
    toast({
      title: "Scanning Started",
      description: "Looking for nearby friends...",
    });
    
    // Mock discovery - in a real app, this would happen as devices are found
    setTimeout(() => {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: "Dave",
        distance: "medium",
        lastSeen: new Date(),
        rssi: -65,
      };
      
      setDiscoveredFriends(prev => [...prev, newFriend]);
      
      toast({
        title: "New Friend Found!",
        description: `${newFriend.name} is nearby.`,
      });
    }, 3000);
  };

  const stopScanning = () => {
    // In a real implementation, we would stop the Web Bluetooth scanning here
    setIsScanning(false);
    toast({
      title: "Scanning Stopped",
      description: "No longer looking for friends.",
    });
  };

  const startBroadcasting = () => {
    if (!bluetoothAvailable) {
      toast({
        title: "Cannot Start Broadcasting",
        description: "Bluetooth is not available on this device.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, we would start advertising via Web Bluetooth here
    setIsBroadcasting(true);
    toast({
      title: "Broadcasting Started",
      description: "Others can now find you.",
    });
  };

  const stopBroadcasting = () => {
    // In a real implementation, we would stop the Web Bluetooth advertising here
    setIsBroadcasting(false);
    toast({
      title: "Broadcasting Stopped",
      description: "You're no longer visible to others.",
    });
  };

  return (
    <BluetoothContext.Provider
      value={{
        isScanning,
        isBroadcasting,
        discoveredFriends,
        startScanning,
        stopScanning,
        startBroadcasting,
        stopBroadcasting,
        bluetoothAvailable,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};
