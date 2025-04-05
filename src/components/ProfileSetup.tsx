
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";

const ProfileSetup: React.FC = () => {
  const { updateProfile } = useProfile();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateProfile({ name });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blueBuddy-800">Welcome to Blue Buddy</CardTitle>
          <CardDescription>Set up your profile to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-blueBuddy-300">
                <AvatarFallback className="bg-blueBuddy-500 text-2xl text-white">
                  {name.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full gradient-blue hover:opacity-90"
            disabled={!name.trim()}
          >
            Start Finding Friends
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSetup;
