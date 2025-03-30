import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { avatars } from "@shared/data/questions";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import GameModesSelector from "@/components/GameModesSelector";
import PlayerProfile from "@/components/PlayerProfile";
import Achievements from "@/components/Achievements";
import { Button } from "@/components/ui/button";
import { GameMode, GameDifficulty, Achievement } from "@shared/types/game";

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Fetch achievements
  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
    enabled: isAuthenticated,
  });

  // Setup game mode selection
  const handleStartGame = (mode: GameMode, difficulty: GameDifficulty, topic: string | null) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Store game settings in session storage
    sessionStorage.setItem("gameMode", mode);
    sessionStorage.setItem("gameDifficulty", difficulty);
    if (topic) sessionStorage.setItem("gameTopic", topic);
    else sessionStorage.removeItem("gameTopic");
    
    // Navigate to game screen
    navigate("/play");
  };

  return (
    <div className="game-container">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header userProfile={user} />
        
        {!isAuthenticated && !isLoading ? (
          <div className="card text-center">
            <h2 className="page-title mb-4">Welcome to Digital Wellness Quest!</h2>
            <p className="mb-6">Test your digital wellness knowledge and earn rewards.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate("/login")}
                className="button-primary"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="button-secondary"
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          <main className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Game Area */}
            <div className="w-full lg:w-2/3">
              <GameModesSelector onSelectMode={handleStartGame} />
              
              {/* Game Information */}
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">About Digital Wellness Quest</h2>
                <p className="mb-4">
                  Test your digital wellness knowledge with interactive quizzes on various topics including internet safety, 
                  cyberbullying, digital footprint management, screen time balance, and more. Learn essential skills for 
                  healthy technology use while competing for points and achievements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="card">
                    <h3 className="font-medium mb-2">How to Play</h3>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Select a game mode</li>
                      <li>Answer questions within time limit</li>
                      <li>Use lifelines when needed</li>
                      <li>Earn points and achievements</li>
                      <li>Level up your digital wellness expertise</li>
                    </ul>
                  </div>
                  <div className="card">
                    <h3 className="font-medium mb-2">Lifelines</h3>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li><span className="font-medium">50:50</span> - Removes two incorrect answers</li>
                      <li><span className="font-medium">Ask Expert</span> - Get advice from security expert</li>
                      <li>Use lifelines wisely - they reduce points earned</li>
                      <li>Lifelines refresh daily or can be purchased</li>
                    </ul>
                  </div>
                </div>
                <button 
                  onClick={() => handleStartGame(GameMode.SoloQuest, GameDifficulty.Beginner, null)}
                  className="button-primary w-full flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Start Quiz
                </button>
              </div>
            </div>
            
            {/* Right Column: Player Profile & Achievements */}
            <div className="w-full lg:w-1/3">
              {isAuthenticated && (
                <>
                  <PlayerProfile userProfile={user} avatars={avatars} />
                  <Achievements achievements={achievements} />
                </>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
