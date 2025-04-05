
import React, { createContext, useState, useContext, useEffect } from 'react';

interface Profile {
  name: string;
  avatar?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  isProfileSetup: boolean;
  updateProfile: (profile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileSetup, setIsProfileSetup] = useState(false);

  // Load profile from localStorage if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('blueBuddyProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setIsProfileSetup(true);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, []);

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    setIsProfileSetup(true);
    localStorage.setItem('blueBuddyProfile', JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isProfileSetup,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
