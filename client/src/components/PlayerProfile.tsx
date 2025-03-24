import { UserProfile, Avatar } from "@shared/types/game";
import { getTopicLevel } from "@/lib/gameUtils";

interface PlayerProfileProps {
  userProfile: UserProfile | null;
  avatars: Avatar[];
}

export default function PlayerProfile({ userProfile, avatars }: PlayerProfileProps) {
  if (!userProfile) return null;

  const userAvatarId = userProfile.avatarId || "default";
  const userAvatar = avatars.find(a => a.id === userAvatarId);
  
  // Get topic expertise data
  const topicsExpertise = userProfile.stats.topicsExpertise;
  const topicsData = Object.entries(topicsExpertise).map(([topic, count]) => {
    const { level, percentage } = getTopicLevel(count);
    return { topic, level, percentage };
  });

  // Sort by percentage (highest first)
  topicsData.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="card mb-6 overflow-hidden">
      <div className="bg-[#F8D000] p-6 -m-4 mb-4 border-b-2 border-black relative">
        <div className="absolute top-0 right-0 m-4">
          <button className="bg-white border-2 border-black w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 overflow-hidden border-2 border-black mb-3 avatar">
            <img 
              src={userAvatar?.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"} 
              alt={userAvatar?.name || "User avatar"} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h2 className="font-semibold text-xl text-black">{userProfile.username}</h2>
          <p className="text-black text-sm">Level {userProfile.level} • Security Specialist</p>
        </div>
      </div>
      
      <div className="py-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-medium">
              {userProfile.stats.questionsAnswered > 0 
                ? Math.round((userProfile.stats.correctAnswers / userProfile.stats.questionsAnswered) * 100)
                : 0}%
            </div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium">{userProfile.stats.questionsAnswered}</div>
            <div className="text-xs text-gray-600">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium">{userProfile.stats.highestStreak}</div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </div>
        </div>
        
        {/* Topic Expertise */}
        <h3 className="font-medium mb-3">Topic Expertise</h3>
        <div className="space-y-3 mb-6">
          {topicsData.length > 0 ? (
            topicsData.slice(0, 4).map(({ topic, level, percentage }) => (
              <div key={topic}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{topic}</span>
                  <span>{level}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm">
              Complete questions to build your expertise!
            </div>
          )}
        </div>
        
        {/* Avatar Collection */}
        <h3 className="font-medium mb-3">Avatar Collection</h3>
        <div className="grid grid-cols-4 gap-3">
          {avatars.slice(0, 4).map(avatar => (
            <div key={avatar.id} className="relative cursor-pointer group">
              <div className={`w-full pt-full overflow-hidden border-2 relative ${avatar.id === userAvatarId ? 'border-[#F8D000]' : 'border-black'}`}>
                <img 
                  src={avatar.imageUrl} 
                  alt={avatar.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover" 
                />
              </div>
              {avatar.id === userAvatarId && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-[#F8D000] border border-black flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
              {!avatar.unlocked && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-white border border-black flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
