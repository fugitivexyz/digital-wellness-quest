import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import QuizGame from "@/components/QuizGame";
import FeedbackPanel from "@/components/FeedbackPanel";
import FeedbackModal from "@/components/FeedbackModal";
import GameResults from "@/components/GameResults";
import { useGameState } from "@/hooks/useGameState";
import { GameMode, GameDifficulty } from "@shared/types/game";

export default function GameScreen() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);

  // Get game settings from session storage
  const gameMode = (sessionStorage.getItem("gameMode") as GameMode) || GameMode.SoloQuest;
  const gameDifficulty = (sessionStorage.getItem("gameDifficulty") as GameDifficulty) || GameDifficulty.Beginner;
  const gameTopic = sessionStorage.getItem("gameTopic");

  // Initialize game state
  const {
    gameState,
    feedbackState,
    showFeedback,
    timer,
    expertTip,
    startGame,
    answerQuestion,
    nextQuestion,
    useFiftyFiftyLifeline,
    useAskExpertLifeline
  } = useGameState(user);

  // Get user lifelines
  const { data: lifelines } = useQuery({
    queryKey: ['/api/user/lifelines'],
    enabled: isAuthenticated,
    initialData: { fiftyFifty: 3, askExpert: 3 }
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Start game when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      startGame(gameMode, gameDifficulty, gameTopic);
    }
  }, [isAuthenticated, startGame, gameMode, gameDifficulty, gameTopic]);

  // Show modal when achievements are unlocked
  useEffect(() => {
    if (feedbackState.unlockedAchievements.length > 0) {
      setShowModal(true);
    }
  }, [feedbackState.unlockedAchievements]);

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="game-container">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header userProfile={user} />
        
        <main className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {/* Game Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {gameDifficulty.charAt(0).toUpperCase() + gameDifficulty.slice(1)} Challenge
                </h2>
                <p className="text-sm text-gray-600">
                  Mode: {gameMode === GameMode.SoloQuest ? 'Solo Quest' : gameMode}
                  {gameTopic && ` • Topic: ${gameTopic}`}
                </p>
              </div>
              
              <button 
                onClick={() => navigate("/")}
                className="button-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Exit Game
              </button>
            </div>
            
            {/* Game Content */}
            {gameState.isGameOver ? (
              <GameResults 
                score={gameState.score}
                questionsAnswered={gameState.answeredQuestions.length}
                maxStreak={gameState.streak}
                onPlayAgain={() => startGame(gameMode, gameDifficulty, gameTopic)}
                onExit={() => navigate("/")}
              />
            ) : (
              <>
                {showFeedback ? (
                  <FeedbackPanel 
                    feedback={feedbackState} 
                    onContinue={nextQuestion} 
                  />
                ) : (
                  <QuizGame 
                    question={gameState.currentQuestion}
                    questionNumber={gameState.questionNumber}
                    totalQuestions={gameState.totalQuestions}
                    score={gameState.score}
                    streak={gameState.streak}
                    timer={timer}
                    onAnswer={answerQuestion}
                    onUseFiftyFifty={useFiftyFiftyLifeline}
                    onUseAskExpert={useAskExpertLifeline}
                    expertTip={expertTip}
                    fiftyFiftyAvailable={lifelines?.fiftyFifty || 0}
                    askExpertAvailable={lifelines?.askExpert || 0}
                  />
                )}
              </>
            )}
          </div>
          
          {/* Sidebar - Show minimized version on game screen */}
          <div className="w-full lg:w-1/3">
            {isAuthenticated && user && (
              <div className="card p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden avatar mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                      alt="User avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-black">{user.username}</h2>
                    <p className="text-gray-600 text-sm">Level {user.level} • {user.coins} Coins</p>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F8D000] mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span className="text-xs text-gray-600">{user.stats.questionsAnswered} Questions</span>
                      </div>
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F8D000] mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="text-xs text-gray-600">{user.stats.highestStreak} Best Streak</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-4">
                  <h3 className="font-medium mb-2 text-black">Game Tips</h3>
                  <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                    <li>Read each question carefully before answering</li>
                    <li>Consecutive correct answers build your streak multiplier</li>
                    <li>Faster answers earn more points</li>
                    <li>Use lifelines wisely - they reduce your score</li>
                    <li>Review explanations to improve your knowledge</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Feedback Modal */}
      {showModal && (
        <FeedbackModal 
          feedback={feedbackState}
          onClose={handleCloseModal}
          onContinue={() => {
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}
