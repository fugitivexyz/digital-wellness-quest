import { questions } from "@shared/data/questions";
import { 
  GameDifficulty, 
  GameMode, 
  QuestionState, 
  GameState,
  FeedbackState
} from "@shared/types/game";

export const DEFAULT_GAME_STATE: GameState = {
  currentQuestion: null,
  score: 0,
  streak: 0,
  questionNumber: 0,
  totalQuestions: 10,
  gameMode: GameMode.SoloQuest,
  difficulty: GameDifficulty.Beginner,
  topic: null,
  isGameOver: false,
  answeredQuestions: []
};

export const DEFAULT_FEEDBACK_STATE: FeedbackState = {
  isCorrect: null,
  pointsEarned: 0,
  streakMultiplier: 0,
  explanation: "",
  securityTip: "",
  unlockedAchievements: []
};

export function getQuestionsByDifficulty(difficulty: GameDifficulty): QuestionState[] {
  return questions
    .filter(q => q.difficulty === difficulty)
    .map(q => ({
      ...q,
      selectedOption: null,
      timeRemaining: 30,
      usedLifelines: {
        fiftyFifty: false,
        askExpert: false
      },
      eliminatedOptions: []
    }));
}

export function getQuestionsByTopic(topic: string): QuestionState[] {
  return questions
    .filter(q => q.topic === topic)
    .map(q => ({
      ...q,
      selectedOption: null,
      timeRemaining: 30,
      usedLifelines: {
        fiftyFifty: false,
        askExpert: false
      },
      eliminatedOptions: []
    }));
}

export function getMixedQuestions(): QuestionState[] {
  // Get mix of questions across difficulties and topics
  const beginnerQuestions = questions.filter(q => q.difficulty === "beginner");
  const intermediateQuestions = questions.filter(q => q.difficulty === "intermediate");
  const advancedQuestions = questions.filter(q => q.difficulty === "advanced");
  
  // Get 5 beginner, 3 intermediate, 2 advanced questions
  const selected = [
    ...getRandomElements(beginnerQuestions, 5),
    ...getRandomElements(intermediateQuestions, 3),
    ...getRandomElements(advancedQuestions, 2)
  ];
  
  return selected.map(q => ({
    ...q,
    selectedOption: null,
    timeRemaining: 30,
    usedLifelines: {
      fiftyFifty: false,
      askExpert: false
    },
    eliminatedOptions: []
  }));
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function useFiftyFifty(question: QuestionState): number[] {
  // Get indices of wrong options
  const wrongOptions = question.options
    .map((_, index) => index)
    .filter(index => index !== question.correctOptionIndex);
  
  // Randomly remove 2 wrong options
  const shuffled = [...wrongOptions].sort(() => 0.5 - Math.random());
  const eliminatedOptions = shuffled.slice(0, 2);
  
  return eliminatedOptions;
}

export function calculateScore(
  isCorrect: boolean,
  basePoints: number,
  timeRemaining: number,
  streak: number,
  usedLifelines: { fiftyFifty: boolean, askExpert: boolean }
): number {
  if (!isCorrect) return 0;
  
  // Base points
  let points = basePoints;
  
  // Time bonus (up to 50% extra)
  const timeBonus = Math.floor((timeRemaining / 30) * (basePoints * 0.5));
  points += timeBonus;
  
  // Streak multiplier (add 10% per streak level, up to 2x)
  const streakMultiplier = Math.min(1 + (streak * 0.1), 2);
  points = Math.floor(points * streakMultiplier);
  
  // Lifeline penalties (20% penalty per lifeline used)
  if (usedLifelines.fiftyFifty) points = Math.floor(points * 0.8);
  if (usedLifelines.askExpert) points = Math.floor(points * 0.8);
  
  return points;
}

export function getAskExpertTip(question: QuestionState): string {
  const correctOption = question.options[question.correctOptionIndex];
  
  const expertResponses = [
    `Based on my experience, I'd say the correct answer is "${correctOption}". The patterns in this scenario clearly indicate this as the safest cybersecurity practice.`,
    `From a security perspective, you should choose "${correctOption}". This aligns with best practices for protecting your digital information.`,
    `I'd recommend going with "${correctOption}". This approach provides the strongest protection against the specific threats described in the question.`,
    `The most secure option here is definitely "${correctOption}". Other choices might seem reasonable but contain subtle security flaws.`
  ];
  
  return expertResponses[Math.floor(Math.random() * expertResponses.length)];
}

export function formatTimer(seconds: number): string {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

export function getLevelProgress(experience: number, level: number): number {
  const experienceForNextLevel = level * 1000;
  return (experience / experienceForNextLevel) * 100;
}

export function getTopicLevel(expertise: number): { level: string, percentage: number } {
  if (expertise >= 40) return { level: "Expert", percentage: 100 };
  if (expertise >= 30) return { level: "Advanced", percentage: 80 };
  if (expertise >= 20) return { level: "Intermediate", percentage: 60 };
  if (expertise >= 10) return { level: "Beginner", percentage: 40 };
  return { level: "Novice", percentage: 20 };
}
