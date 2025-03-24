import { GameMode, GameDifficulty } from "@shared/types/game";

interface GameModesSelectorProps {
  onSelectMode: (mode: GameMode, difficulty: GameDifficulty, topic: string | null) => void;
}

export default function GameModesSelector({ onSelectMode }: GameModesSelectorProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card p-6 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold mb-2">Solo Quest</div>
        <p className="text-sm mb-4">Challenge yourself</p>
        <button 
          onClick={() => onSelectMode(GameMode.SoloQuest, GameDifficulty.Beginner, null)}
          className="button-primary w-full"
        >
          Play
        </button>
      </div>
      
      <div className="card p-6 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold mb-2">Time Attack</div>
        <p className="text-sm mb-4">Race against time</p>
        <button 
          disabled
          className="button-secondary w-full opacity-50 cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}
