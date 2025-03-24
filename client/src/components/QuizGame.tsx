import { useState, useEffect } from "react";
import { QuestionState } from "@shared/types/game";
import { formatTimer } from "@/lib/gameUtils";

interface QuizGameProps {
  question: QuestionState | null;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  streak: number;
  timer: number | null;
  onAnswer: (questionId: string, selectedOptionIndex: number) => void;
  onUseFiftyFifty: () => void;
  onUseAskExpert: () => void;
  expertTip: string;
  fiftyFiftyAvailable: number;
  askExpertAvailable: number;
}

export default function QuizGame({
  question,
  questionNumber,
  totalQuestions,
  score,
  streak,
  timer,
  onAnswer,
  onUseFiftyFifty,
  onUseAskExpert,
  expertTip,
  fiftyFiftyAvailable,
  askExpertAvailable
}: QuizGameProps) {
  const [showExpertTip, setShowExpertTip] = useState(false);

  // Reset expert tip when question changes
  useEffect(() => {
    setShowExpertTip(false);
  }, [question?.id]);

  if (!question) return null;

  const difficultyLabel = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  
  const handleAnswerClick = (index: number) => {
    if (question.selectedOption !== null) return;
    onAnswer(question.id, index);
  };

  const handleFiftyFifty = () => {
    if (question.usedLifelines.fiftyFifty || question.selectedOption !== null || fiftyFiftyAvailable <= 0) return;
    onUseFiftyFifty();
  };

  const handleAskExpert = () => {
    if (question.usedLifelines.askExpert || question.selectedOption !== null || askExpertAvailable <= 0) return;
    onUseAskExpert();
    setShowExpertTip(true);
  };

  const isOptionEliminated = (index: number) => {
    return question.eliminatedOptions.includes(index);
  };

  return (
    <div className="card mb-6">
      {/* Quiz Header */}
      <div className="game-header bg-[#F8D000] p-4 -m-4 mb-4 border-b-2 border-black">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg text-black">{difficultyLabel} Challenge</h2>
            <p className="text-black text-sm">Topic: {question.topic}</p>
          </div>
          <div className="flex items-center bg-white border-2 border-black px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F8D000] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
            <span className="font-medium text-black">Score: {score}</span>
          </div>
        </div>
      </div>
      
      {/* Quiz Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {questionNumber} of {totalQuestions}</span>
          {streak > 0 && <span className="text-black font-bold">Streak: {streak}x</span>}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <div className="py-4">
        <h3 className="text-xl font-medium mb-6">{question.text}</h3>
        
        {/* Expert Tip */}
        {showExpertTip && (
          <div className="card mb-6">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black mr-2 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div>
                <h4 className="font-medium text-sm mb-1">Expert Advice:</h4>
                <p className="text-sm">{expertTip}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = question.selectedOption === index;
            const isCorrect = question.selectedOption !== null && index === question.correctOptionIndex;
            const isWrong = question.selectedOption === index && index !== question.correctOptionIndex;
            const isEliminated = isOptionEliminated(index);
            
            let optionClassName = "game-option transition-all duration-200";
            
            if (isEliminated) {
              optionClassName += " opacity-30 pointer-events-none";
            }
            
            if (isSelected) {
              optionClassName += isCorrect 
                ? " bg-green-100 border-green-500" 
                : " bg-red-100 border-red-500";
            } else if (isCorrect && question.selectedOption !== null) {
              optionClassName += " bg-green-100 border-green-500";
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={question.selectedOption !== null || isEliminated}
                className={`${optionClassName}`}
              >
                <div className="flex items-start">
                  <span className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-medium mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Lifelines */}
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={handleFiftyFifty}
            disabled={question.usedLifelines.fiftyFifty || question.selectedOption !== null || fiftyFiftyAvailable <= 0}
            className={`lifeline-button relative transition-colors duration-200
              ${question.usedLifelines.fiftyFifty || fiftyFiftyAvailable <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="50/50"
          >
            <span className="font-medium text-sm">50:50</span>
            {fiftyFiftyAvailable > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F8D000] text-black text-xs w-5 h-5 flex items-center justify-center border border-black">
                {fiftyFiftyAvailable}
              </span>
            )}
          </button>
          
          <button 
            onClick={handleAskExpert}
            disabled={question.usedLifelines.askExpert || question.selectedOption !== null || askExpertAvailable <= 0}
            className={`lifeline-button relative transition-colors duration-200
              ${question.usedLifelines.askExpert || askExpertAvailable <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Ask the Expert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {askExpertAvailable > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F8D000] text-black text-xs w-5 h-5 flex items-center justify-center border border-black">
                {askExpertAvailable}
              </span>
            )}
          </button>
        </div>
        
        {/* Timer */}
        <div className="flex justify-center">
          <div className={`w-16 h-16 border-2 border-black flex items-center justify-center
            ${timer && timer <= 5 ? 'bg-red-100 animate-pulse' : 'bg-white'}`}>
            <span className="font-medium text-xl">{timer !== null ? formatTimer(timer) : "00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
