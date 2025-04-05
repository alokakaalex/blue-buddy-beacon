
import React from 'react';
import { useBluetooth } from "@/context/BluetoothContext";
import { Button } from "@/components/ui/button";
import { Radar, Broadcast, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ControlPanel: React.FC = () => {
  const { 
    isScanning, 
    isBroadcasting, 
    startScanning, 
    stopScanning, 
    startBroadcasting, 
    stopBroadcasting,
    bluetoothAvailable
  } = useBluetooth();
  const { toast } = useToast();

  const handleScanToggle = () => {
    if (isScanning) {
      stopScanning();
    } else if (bluetoothAvailable) {
      startScanning();
    } else {
      toast({
        title: "Bluetooth Not Available",
        description: "Bluetooth functionality is not available in this browser or device.",
        variant: "destructive"
      });
    }
  };

  const handleBroadcastToggle = () => {
    if (isBroadcasting) {
      stopBroadcasting();
    } else if (bluetoothAvailable) {
      startBroadcasting();
    } else {
      toast({
        title: "Bluetooth Not Available",
        description: "Bluetooth functionality is not available in this browser or device.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex space-x-4">
        <Button
          variant={isScanning ? "destructive" : "default"}
          className={`flex-1 ${!isScanning && "gradient-blue"}`}
          onClick={handleScanToggle}
        >
          {isScanning ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Stop Scanning
            </>
          ) : (
            <>
              <Radar className="mr-2 h-4 w-4" />
              Scan for Friends
            </>
          )}
        </Button>

        <Button 
          variant={isBroadcasting ? "destructive" : "default"}
          className={`flex-1 ${!isBroadcasting && "gradient-blue"}`}
          onClick={handleBroadcastToggle}
        >
          {isBroadcasting ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Stop Broadcasting
            </>
          ) : (
            <>
              <Broadcast className="mr-2 h-4 w-4" />
              Broadcast Yourself
            </>
          )}
        </Button>
      </div>
      {!bluetoothAvailable && (
        <p className="mt-3 text-xs text-center text-red-500">
          Note: Bluetooth is not available in this browser. This is a simulation.
        </p>
      )}
    </div>
  );
};

export default ControlPanel;
