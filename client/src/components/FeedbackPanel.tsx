import { FeedbackState } from "@shared/types/game";

interface FeedbackPanelProps {
  feedback: FeedbackState;
  onContinue: () => void;
}

export default function FeedbackPanel({ feedback, onContinue }: FeedbackPanelProps) {
  const { isCorrect, pointsEarned, streakMultiplier, explanation, securityTip, unlockedAchievements } = feedback;
  
  if (isCorrect === null) return null;
  
  return (
    <div className="card mb-6">
      <div className={`p-4 -m-4 mb-4 border-b-2 border-black ${isCorrect ? 'bg-[#F8D000]' : 'bg-white'}`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 border-2 border-black flex items-center justify-center mr-3 ${isCorrect ? 'bg-white' : 'bg-white'}`}>
            {isCorrect ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-black">{isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</h2>
            {isCorrect && (
              <p className="text-black text-sm">+{pointsEarned} points • Streak x{streakMultiplier.toFixed(1)}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-4">
        <h3 className="font-medium text-lg mb-2">Explanation:</h3>
        <p className="mb-4">
          {explanation}
        </p>
        
        <div className="card">
          <h4 className="font-medium mb-2">Security Tip:</h4>
          <p className="text-sm">
            {securityTip}
          </p>
        </div>
        
        {/* Show unlocked achievements if any */}
        {unlockedAchievements.length > 0 && (
          <div className="mt-6">
            {unlockedAchievements.map(achievement => (
              <div key={achievement.id} className="card flex items-center mb-2 border-[#F8D000]">
                <div className="w-12 h-12 border-2 border-black bg-[#F8D000] flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold mb-1">Achievement Unlocked!</div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-xs text-gray-600">+{achievement.reward.xp} XP • {achievement.reward.coins} CyberCoins</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <button className="button-secondary py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save to Library
          </button>
          
          <button 
            onClick={onContinue}
            className="button-primary py-2 px-6 flex items-center"
          >
            Next Question
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
