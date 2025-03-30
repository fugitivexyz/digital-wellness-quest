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
          <div className="w-12 h-12 bg-[#F8D000] border-2 border-black flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h1 className="font-bold text-3xl md:text-4xl text-black">Digital<span className="text-[#F8D000]">Wellness</span></h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Cyber Coins */}
          <div className="flex items-center px-3 py-2 bg-white border-2 border-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F8D000] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-medium">{userProfile.coins.toLocaleString()}</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="User avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#F8D000] text-black text-xs w-5 h-5 flex items-center justify-center border border-black">
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
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1 text-right">
          {userProfile.experience} / {userProfile.experienceToNextLevel} XP
        </div>
      </div>
    </header>
  );
}
