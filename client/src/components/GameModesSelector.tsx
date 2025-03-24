import { GameMode, GameDifficulty } from "@shared/types/game";

interface GameModesSelectorProps {
  onSelectMode: (mode: GameMode, difficulty: GameDifficulty, topic: string | null) => void;
}

export default function GameModesSelector({ onSelectMode }: GameModesSelectorProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <button 
        onClick={() => onSelectMode(GameMode.SoloQuest, GameDifficulty.Beginner, null)}
        className="bg-gray-800 border-2 border-primary text-white rounded-lg py-3 px-4 font-semibold text-sm flex items-center justify-center hover:bg-primary transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Solo Quest
      </button>
      
      <button 
        disabled
        className="bg-gray-800 text-gray-500 rounded-lg py-3 px-4 font-semibold text-sm flex items-center justify-center opacity-50 cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Time Attack
        <span className="ml-2 text-xs bg-primary px-2 py-0.5 rounded">Soon</span>
      </button>
      
      <button 
        disabled
        className="bg-gray-800 text-gray-500 rounded-lg py-3 px-4 font-semibold text-sm flex items-center justify-center opacity-50 cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        Team Challenge
        <span className="ml-2 text-xs bg-primary px-2 py-0.5 rounded">Soon</span>
      </button>
    </div>
  );
}
