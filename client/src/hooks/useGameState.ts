import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/lib/queryClient";
import { 
  GameState, 
  GameMode, 
  GameDifficulty, 
  QuestionState,
  FeedbackState,
  UserProfile
} from "@shared/types/game";
import { 
  DEFAULT_GAME_STATE, 
  DEFAULT_FEEDBACK_STATE,
  getQuestionsByDifficulty,
  getQuestionsByTopic,
  getMixedQuestions,
  getRandomElements,
  useFiftyFifty,
  calculateScore,
  getAskExpertTip
} from "@/lib/gameUtils";

export function useGameState(userProfile: UserProfile | null) {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const [gameQuestions, setGameQuestions] = useState<QuestionState[]>([]);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>(DEFAULT_FEEDBACK_STATE);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [expertTip, setExpertTip] = useState<string>("");

  // Start a new game
  const startGame = useCallback((mode: GameMode, difficulty: GameDifficulty, topic: string | null) => {
    // Reset game state
    setGameState({
      ...DEFAULT_GAME_STATE,
      gameMode: mode,
      difficulty,
      topic,
      totalQuestions: 10,
      isGameOver: false
    });
    
    setFeedbackState(DEFAULT_FEEDBACK_STATE);
    setShowFeedback(false);
    
    // Get questions based on difficulty/topic
    let questions: QuestionState[];
    
    if (topic) {
      questions = getQuestionsByTopic(topic);
    } else if (difficulty === GameDifficulty.Beginner || 
               difficulty === GameDifficulty.Intermediate || 
               difficulty === GameDifficulty.Advanced) {
      questions = getQuestionsByDifficulty(difficulty);
    } else {
      questions = getMixedQuestions();
    }
    
    // Randomize and limit to 10 questions
    const selectedQuestions = getRandomElements(questions, 10);
    setGameQuestions(selectedQuestions);
    
    // Set first question
    loadNextQuestion(0, selectedQuestions);
  }, []);

  // Load next question
  const loadNextQuestion = useCallback((index: number, questions = gameQuestions) => {
    if (index >= questions.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: null,
        isGameOver: true
      }));
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      questionNumber: index + 1,
      currentQuestion: questions[index]
    }));
    
    // Start timer
    setTimer(30);
  }, [gameQuestions]);

  // Answer a question
  const answerQuestion = useCallback(async (questionId: string, selectedOptionIndex: number) => {
    const currentQuestion = gameState.currentQuestion;
    if (!currentQuestion || currentQuestion.selectedOption !== null) return;
    
    // Stop timer
    setTimer(null);
    
    // Check if answer is correct
    const isCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;
    
    // Update question state
    const updatedQuestion = {
      ...currentQuestion,
      selectedOption: selectedOptionIndex
    };
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: updatedQuestion,
      streak: isCorrect ? prev.streak + 1 : 0,
      answeredQuestions: [...prev.answeredQuestions, questionId]
    }));
    
    // Calculate points
    const points = calculateScore(
      isCorrect,
      currentQuestion.points,
      currentQuestion.timeRemaining,
      gameState.streak,
      currentQuestion.usedLifelines
    );
    
    // Send answer to server
    try {
      const result = await apiRequest("POST", "/api/game/answer", {
        questionId,
        selectedOptionIndex,
        timeRemaining: currentQuestion.timeRemaining,
        usedLifelines: currentQuestion.usedLifelines,
        streak: gameState.streak + (isCorrect ? 1 : 0)
      });
      
      const data = await result.json();
      
      // Update feedback state
      setFeedbackState({
        isCorrect,
        pointsEarned: points,
        streakMultiplier: Math.min(1 + (gameState.streak * 0.1), 2),
        explanation: currentQuestion.explanation,
        securityTip: currentQuestion.securityTip,
        unlockedAchievements: data.unlockedAchievements || []
      });
      
      // Update game score
      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + points
        }));
      }
      
      // Show feedback
      setShowFeedback(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  }, [gameState]);

  // Go to next question
  const nextQuestion = useCallback(() => {
    setShowFeedback(false);
    
    const nextIndex = gameState.questionNumber;
    if (nextIndex >= gameState.totalQuestions) {
      setGameState(prev => ({
        ...prev,
        isGameOver: true
      }));
      return;
    }
    
    loadNextQuestion(nextIndex);
  }, [gameState.questionNumber, gameState.totalQuestions, loadNextQuestion]);

  // Use 50/50 lifeline
  const useFiftyFiftyLifeline = useCallback(() => {
    if (!gameState.currentQuestion || !userProfile || userProfile.lifelines.fiftyFifty <= 0) return;
    
    const eliminatedOptions = useFiftyFifty(gameState.currentQuestion);
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: {
        ...prev.currentQuestion!,
        usedLifelines: {
          ...prev.currentQuestion!.usedLifelines,
          fiftyFifty: true
        },
        eliminatedOptions
      }
    }));
  }, [gameState.currentQuestion, userProfile]);

  // Use Ask Expert lifeline
  const useAskExpertLifeline = useCallback(() => {
    if (!gameState.currentQuestion || !userProfile || userProfile.lifelines.askExpert <= 0) return;
    
    const tip = getAskExpertTip(gameState.currentQuestion);
    setExpertTip(tip);
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: {
        ...prev.currentQuestion!,
        usedLifelines: {
          ...prev.currentQuestion!.usedLifelines,
          askExpert: true
        }
      }
    }));
  }, [gameState.currentQuestion, userProfile]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timer !== null && timer > 0 && gameState.currentQuestion) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === null || prev <= 1) {
            if (interval) clearInterval(interval);
            
            // Auto-submit if time runs out
            if (gameState.currentQuestion && gameState.currentQuestion.selectedOption === null) {
              // Submit a wrong answer if time runs out
              answerQuestion(gameState.currentQuestion.id, -1);
            }
            
            return 0;
          }
          
          // Update time remaining in question
          setGameState(prev => ({
            ...prev,
            currentQuestion: prev.currentQuestion 
              ? { ...prev.currentQuestion, timeRemaining: prev.currentQuestion.timeRemaining - 1 }
              : null
          }));
          
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, gameState.currentQuestion, answerQuestion]);

  return {
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
  };
}
