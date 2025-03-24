import { FeedbackState } from "@shared/types/game";

interface FeedbackPanelProps {
  feedback: FeedbackState;
  onContinue: () => void;
}

export default function FeedbackPanel({ feedback, onContinue }: FeedbackPanelProps) {
  const { isCorrect, pointsEarned, streakMultiplier, explanation, securityTip, unlockedAchievements } = feedback;
  
  if (isCorrect === null) return null;
  
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-6">
      <div className={`bg-gradient-to-r py-4 px-6 ${isCorrect ? 'from-green-800 to-green-600' : 'from-red-900 to-red-700'}`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
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
            <h2 className="font-semibold text-lg">{isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</h2>
            {isCorrect && (
              <p className="text-white text-sm">+{pointsEarned} points • Streak x{streakMultiplier.toFixed(1)}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-medium text-lg mb-2">Explanation:</h3>
        <p className="text-gray-300 mb-4">
          {explanation}
        </p>
        
        <div className="bg-gray-900 p-4 rounded-lg">
          <h4 className="font-medium text-blue-400 mb-2">Security Tip:</h4>
          <p className="text-sm text-gray-300">
            {securityTip}
          </p>
        </div>
        
        {/* Show unlocked achievements if any */}
        {unlockedAchievements.length > 0 && (
          <div className="mt-6">
            {unlockedAchievements.map(achievement => (
              <div key={achievement.id} className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4 flex items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-400 mb-1">Achievement Unlocked!</div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-xs text-gray-400">+{achievement.reward.xp} XP • {achievement.reward.coins} CyberCoins</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <button className="bg-gray-900 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save to Library
          </button>
          
          <button 
            onClick={onContinue}
            className="bg-primary hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Next Question
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
