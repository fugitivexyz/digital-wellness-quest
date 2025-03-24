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
import { GameMode, GameDifficulty } from "@shared/types/game";

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Fetch achievements
  const { data: achievements = [] } = useQuery({
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
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header userProfile={user} />
        
        {!isAuthenticated && !isLoading ? (
          <div className="bg-gray-800 rounded-xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to CyberQuest Challenge!</h2>
            <p className="mb-6">Test your cybersecurity knowledge and earn rewards.</p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-purple-700"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="outline"
                className="bg-transparent border-primary text-white hover:bg-primary"
              >
                Register
              </Button>
            </div>
          </div>
        ) : (
          <main className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Game Area */}
            <div className="w-full lg:w-2/3">
              <GameModesSelector onSelectMode={handleStartGame} />
              
              {/* Game Information */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About CyberQuest Challenge</h2>
                <p className="text-gray-300 mb-4">
                  Test your cybersecurity knowledge with interactive quizzes on various topics including phishing, 
                  password security, privacy settings, and more. Learn essential online safety skills while competing 
                  for points and achievements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-400 mb-2">How to Play</h3>
                    <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                      <li>Select a game mode</li>
                      <li>Answer questions within time limit</li>
                      <li>Use lifelines when needed</li>
                      <li>Earn points and achievements</li>
                      <li>Level up your cybersecurity expertise</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-400 mb-2">Lifelines</h3>
                    <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                      <li><span className="font-medium">50:50</span> - Removes two incorrect answers</li>
                      <li><span className="font-medium">Ask Expert</span> - Get advice from security expert</li>
                      <li>Use lifelines wisely - they reduce points earned</li>
                      <li>Lifelines refresh daily or can be purchased</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartGame(GameMode.SoloQuest, GameDifficulty.Beginner, null)}
                  className="w-full bg-primary hover:bg-purple-700 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Start Quiz
                </Button>
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
