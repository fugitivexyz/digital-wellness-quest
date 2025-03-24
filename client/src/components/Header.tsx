import { UserProfile } from "@shared/types/game";
import { getLevelProgress } from "@/lib/gameUtils";

interface HeaderProps {
  userProfile: UserProfile | null;
}

export default function Header({ userProfile }: HeaderProps) {
  if (!userProfile) return null;

  const progressPercentage = getLevelProgress(userProfile.experience, userProfile.level);

  return (
    <header className="mb-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="font-bold text-3xl md:text-4xl text-white">Cyber<span className="text-blue-400">Quest</span></h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Cyber Coins */}
          <div className="flex items-center px-3 py-2 bg-gray-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-medium">{userProfile.coins.toLocaleString()}</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="User avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                <span>{userProfile.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Level {userProfile.level}</span>
          <span>Level {userProfile.level + 1}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {userProfile.experience} / {userProfile.experienceToNextLevel} XP
        </div>
      </div>
    </header>
  );
}
