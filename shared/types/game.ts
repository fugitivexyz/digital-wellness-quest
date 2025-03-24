export interface UserProfile {
  id: number;
  username: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  coins: number;
  avatarId: string;
  stats: UserStats;
  achievements: Achievement[];
  lifelines: Lifelines;
}

export interface UserStats {
  questionsAnswered: number;
  correctAnswers: number;
  highestStreak: number;
  topicsExpertise: Record<string, number>;
}

export interface Lifelines {
  fiftyFifty: number;
  askExpert: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: Date;
  icon: string;
  reward: {
    xp: number;
    coins: number;
  };
}

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  cost: number;
}

export interface GameState {
  currentQuestion: QuestionState | null;
  score: number;
  streak: number;
  questionNumber: number;
  totalQuestions: number;
  gameMode: GameMode;
  difficulty: GameDifficulty;
  topic: string | null;
  isGameOver: boolean;
  answeredQuestions: string[];
}

export interface QuestionState {
  id: string;
  text: string;
  options: string[];
  selectedOption: number | null;
  correctOptionIndex: number;
  explanation: string;
  securityTip: string;
  difficulty: GameDifficulty;
  topic: string;
  points: number;
  timeRemaining: number;
  usedLifelines: {
    fiftyFifty: boolean;
    askExpert: boolean;
  };
  eliminatedOptions: number[];
}

export enum GameMode {
  SoloQuest = "solo-quest",
  TimeAttack = "time-attack",
  TeamChallenge = "team-challenge"
}

export enum GameDifficulty {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced"
}

export interface FeedbackState {
  isCorrect: boolean | null;
  pointsEarned: number;
  streakMultiplier: number;
  explanation: string;
  securityTip: string;
  unlockedAchievements: Achievement[];
}

export enum GameStatus {
  NotStarted,
  InProgress,
  Paused,
  Completed
}
