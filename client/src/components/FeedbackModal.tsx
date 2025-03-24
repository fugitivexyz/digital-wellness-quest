import { useEffect } from "react";
import { FeedbackState } from "@shared/types/game";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeedbackModalProps {
  feedback: FeedbackState;
  onClose: () => void;
  onContinue: () => void;
}

export default function FeedbackModal({ feedback, onClose, onContinue }: FeedbackModalProps) {
  const { isCorrect, pointsEarned, streakMultiplier, explanation, securityTip, unlockedAchievements } = feedback;

  // Add keydown listener for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Prevent body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="border-gray-700 bg-gray-800 max-w-lg w-full text-white">
        <div className={`p-4 flex justify-between items-center ${isCorrect ? 'bg-gradient-to-r from-green-800 to-green-600' : 'bg-gradient-to-r from-red-900 to-red-700'}`}>
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
            <h2 className="font-semibold text-lg">{isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {isCorrect && (
            <div className="mb-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-medium text-blue-400">+{pointsEarned}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-blue-400">x{streakMultiplier.toFixed(1)}</div>
                <div className="text-xs text-gray-400">Streak</div>
              </div>
            </div>
          )}
          
          <h3 className="font-medium text-lg mb-2">{isCorrect ? 'Why this is correct:' : 'The correct answer:'}</h3>
          <p className="text-gray-300 mb-4">
            {explanation}
          </p>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-blue-400 mb-2">Security Tip:</h4>
            <p className="text-sm text-gray-300">
              {securityTip}
            </p>
          </div>
          
          {/* Achievement Unlocked Animation */}
          {unlockedAchievements.map(achievement => (
            <div key={achievement.id} className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4 flex items-center mb-4">
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
          
          <div className="flex justify-between">
            <Button
              variant="outline" 
              onClick={onClose}
              className="bg-gray-900 hover:bg-gray-700 text-gray-300 border-gray-700"
            >
              Review Later
            </Button>
            <Button
              onClick={onContinue}
              className="bg-primary hover:bg-purple-700 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
