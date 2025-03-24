import { Achievement } from "@shared/types/game";

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  // Sort achievements by unlock status (unlocked first)
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return 0;
  });
  
  // Get unlocked and locked achievements
  const unlockedAchievements = sortedAchievements.filter(a => a.unlocked);
  const lockedAchievements = sortedAchievements.filter(a => !a.unlocked);

  return (
    <div className="card">
      <div className="py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Achievements</h2>
          <button className="text-xs font-medium hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {/* Unlocked Achievements (show first 2) */}
          {unlockedAchievements.slice(0, 2).map(achievement => (
            <div key={achievement.id} className="card flex items-center">
              <div className="w-12 h-12 border-2 border-black bg-[#F8D000] flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {achievement.icon === 'shield-alt' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {achievement.icon === 'fire' && (
                    <>
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                    </>
                  )}
                  {achievement.icon === 'fish' && (
                    <path d="M16.5 17a6 6 0 0 1-7.5-7.5C10 6 5 5 2 5c0 3 1 8 5 10.5A6 6 0 0 1 14.5 19L16 22l3-6c2-1 4-3.5 4-6a6 6 0 0 0-12 0c0 1 .2 2.2 1 3l3.5 3.5" />
                  )}
                  {achievement.icon === 'medal' && (
                    <>
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </>
                  )}
                  {achievement.icon === 'key' && (
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  )}
                  {achievement.icon === 'user-graduate' && (
                    <>
                      <circle cx="12" cy="6" r="5"></circle>
                      <path d="M22 19H2c0-5 5-8 10-8s10 3 10 8z"></path>
                      <path d="M6 9.5L12 4 18 9.5"></path>
                    </>
                  )}
                  {achievement.icon === 'star' && (
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  )}
                  {/* Default icon if none matches */}
                  {!['shield-alt', 'fire', 'fish', 'medal', 'key', 'user-graduate', 'star'].includes(achievement.icon) && (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  )}
                </svg>
              </div>
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-[#F8D000] text-black px-2 py-1 border border-black">+{achievement.reward.xp} XP</span>
              </div>
            </div>
          ))}
          
          {/* Locked Achievements (show first 2) */}
          {lockedAchievements.slice(0, 2).map(achievement => (
            <div key={achievement.id} className="card flex items-center opacity-50">
              <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
              <div className="ml-auto">
                {/* For achievement progress we'd need more data from the server */}
                <span className="text-xs bg-white text-black px-2 py-1 border border-black">Locked</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
