import { Button } from "@/components/ui/button";

interface GameResultsProps {
  score: number;
  questionsAnswered: number;
  maxStreak: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function GameResults({ score, questionsAnswered, maxStreak, onPlayAgain, onExit }: GameResultsProps) {
  // Calculate performance metrics
  const totalQuestions = 10; // Default quiz length
  const percentCorrect = Math.round((score / (questionsAnswered * 100)) * 100) || 0;
  
  // Determine performance level
  let performanceMessage = "";
  let performanceIcon = "";
  
  if (percentCorrect >= 90) {
    performanceMessage = "Cybersecurity Expert";
    performanceIcon = "trophy";
  } else if (percentCorrect >= 70) {
    performanceMessage = "Security Specialist";
    performanceIcon = "shield";
  } else if (percentCorrect >= 50) {
    performanceMessage = "Digital Defender";
    performanceIcon = "lock";
  } else {
    performanceMessage = "Security Rookie";
    performanceIcon = "user";
  }

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-purple-900 to-blue-800 p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Quiz Complete!</h2>
        <p className="text-gray-300">Here's how you performed</p>
      </div>
      
      <div className="p-6">
        {/* Results Summary */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {performanceIcon === "trophy" && (
                <>
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </>
              )}
              {performanceIcon === "shield" && (
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              )}
              {performanceIcon === "lock" && (
                <>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </>
              )}
              {performanceIcon === "user" && (
                <>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </>
              )}
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">{performanceMessage}</h3>
          <p className="text-4xl font-bold mb-2">{score} <span className="text-sm font-normal text-gray-400">points</span></p>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-xl font-medium text-blue-400">{questionsAnswered}/{totalQuestions}</div>
            <div className="text-xs text-gray-400">Questions</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-xl font-medium text-blue-400">{percentCorrect}%</div>
            <div className="text-xs text-gray-400">Accuracy</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-xl font-medium text-blue-400">{maxStreak}x</div>
            <div className="text-xs text-gray-400">Best Streak</div>
          </div>
        </div>
        
        {/* Feedback message */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-300">
            {percentCorrect >= 80
              ? "Outstanding! You've demonstrated excellent cybersecurity knowledge. Keep challenging yourself to become even better!"
              : percentCorrect >= 60
              ? "Good job! You have solid cybersecurity awareness. Review the explanations on questions you missed to strengthen your knowledge."
              : "Keep learning! Cybersecurity is a journey. Review the explanations for questions you missed and try again to improve your score."}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onPlayAgain}
            className="flex-1 bg-primary hover:bg-purple-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
              <path d="M16 21h5v-5"></path>
            </svg>
            Play Again
          </Button>
          <Button
            onClick={onExit}
            variant="outline"
            className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
