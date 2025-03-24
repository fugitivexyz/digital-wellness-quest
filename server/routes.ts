import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { questions, achievements, avatars } from "@shared/data/questions";

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const answerQuestionSchema = z.object({
  questionId: z.string(),
  selectedOptionIndex: z.number().int().min(0).max(3),
  timeRemaining: z.number().int().min(0),
  usedLifelines: z.object({
    fiftyFifty: z.boolean(),
    askExpert: z.boolean(),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Auth routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Create initial lifelines
      await storage.createLifelines(user.id);
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      req.session!.userId = user.id;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(credentials.username);
      if (!user || user.password !== credentials.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Update last login
      await storage.updateLastLogin(user.id);
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      req.session!.userId = user.id;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session!.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // User profile routes
  app.get("/api/user/profile", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Get user's unlocked achievements
      const userAchievements = await storage.getUserAchievements(user.id);
      
      // Get user's lifelines
      const lifelines = await storage.getUserLifelines(user.id);
      
      // Calculate experience needed for next level
      const experienceToNextLevel = user.level * 1000;
      
      // Return user profile data
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({
        ...userWithoutPassword,
        experienceToNextLevel,
        achievements: userAchievements,
        lifelines
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  // Question routes
  app.get("/api/questions", (req, res) => {
    // Return all questions
    res.status(200).json(questions);
  });

  app.get("/api/questions/topics", (req, res) => {
    // Extract unique topics from questions
    const topics = [...new Set(questions.map(q => q.topic))];
    res.status(200).json(topics);
  });

  app.get("/api/questions/by-topic/:topic", (req, res) => {
    const { topic } = req.params;
    const topicQuestions = questions.filter(q => q.topic === topic);
    res.status(200).json(topicQuestions);
  });

  app.get("/api/questions/by-difficulty/:difficulty", (req, res) => {
    const { difficulty } = req.params;
    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty" });
    }
    
    const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
    res.status(200).json(difficultyQuestions);
  });

  // Game progress routes
  app.post("/api/game/answer", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const answerData = answerQuestionSchema.parse(req.body);
      
      // Find the question
      const question = questions.find(q => q.id === answerData.questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      // Check if answer is correct
      const isCorrect = question.correctOptionIndex === answerData.selectedOptionIndex;
      
      // Calculate points based on difficulty, time remaining, and lifelines used
      let points = question.points;
      if (isCorrect) {
        // Add time bonus (up to 50% extra)
        const timeBonus = Math.floor((answerData.timeRemaining / 30) * (question.points * 0.5));
        points += timeBonus;
        
        // Reduce points if lifelines were used
        if (answerData.usedLifelines.fiftyFifty) points = Math.floor(points * 0.8);
        if (answerData.usedLifelines.askExpert) points = Math.floor(points * 0.8);
      } else {
        points = 0;
      }
      
      // Save game progress
      await storage.saveGameProgress({
        userId: req.session.userId,
        questionId: question.id,
        answeredCorrectly: isCorrect,
        difficulty: question.difficulty,
        topic: question.topic
      });
      
      // Update user's stats
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const stats = user.stats || {
        questionsAnswered: 0,
        correctAnswers: 0,
        highestStreak: 0,
        topicsExpertise: {}
      };
      
      stats.questionsAnswered++;
      
      // Current streak info from client
      const { streak } = req.body;
      
      // Process correct answer
      if (isCorrect) {
        stats.correctAnswers++;
        
        // Update streak if provided
        if (typeof streak === 'number' && streak > stats.highestStreak) {
          stats.highestStreak = streak;
        }
        
        // Update topic expertise
        if (!stats.topicsExpertise[question.topic]) {
          stats.topicsExpertise[question.topic] = 0;
        }
        stats.topicsExpertise[question.topic] += 1;
        
        // Add experience and coins
        const experienceGained = points;
        const coinsGained = Math.floor(points / 10);
        
        await storage.updateUserRewards(
          req.session.userId, 
          experienceGained, 
          coinsGained,
          stats
        );
        
        // Check for newly unlocked achievements
        const unlockedAchievements = await storage.checkAndUnlockAchievements(req.session.userId);
        
        res.status(200).json({
          isCorrect,
          points,
          experienceGained,
          coinsGained,
          unlockedAchievements
        });
      } else {
        // Just update stats for incorrect answer
        await storage.updateUserStats(req.session.userId, stats);
        
        res.status(200).json({
          isCorrect,
          points: 0,
          experienceGained: 0,
          coinsGained: 0,
          unlockedAchievements: []
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to process answer" });
    }
  });

  // Lifelines routes
  app.post("/api/lifelines/refresh", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if user has coins to refresh lifelines
      if (user.coins < 100) {
        return res.status(400).json({ message: "Not enough coins" });
      }
      
      // Refresh lifelines and deduct coins
      await storage.refreshLifelines(req.session.userId);
      await storage.updateUserCoins(req.session.userId, -100);
      
      res.status(200).json({ message: "Lifelines refreshed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to refresh lifelines" });
    }
  });

  // Achievements routes
  app.get("/api/achievements", (req, res) => {
    res.status(200).json(achievements);
  });

  // Avatars routes
  app.get("/api/avatars", (req, res) => {
    res.status(200).json(avatars);
  });

  app.post("/api/avatars/purchase/:avatarId", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { avatarId } = req.params;
    
    try {
      // Find the avatar
      const avatar = avatars.find(a => a.id === avatarId);
      if (!avatar) {
        return res.status(404).json({ message: "Avatar not found" });
      }
      
      // Check if user has enough coins
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (user.coins < avatar.cost) {
        return res.status(400).json({ message: "Not enough coins" });
      }
      
      // Purchase avatar
      await storage.purchaseAvatar(req.session.userId, avatarId);
      await storage.updateUserCoins(req.session.userId, -avatar.cost);
      
      res.status(200).json({ message: "Avatar purchased successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to purchase avatar" });
    }
  });

  app.post("/api/avatars/select/:avatarId", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { avatarId } = req.params;
    
    try {
      await storage.selectAvatar(req.session.userId, avatarId);
      res.status(200).json({ message: "Avatar selected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to select avatar" });
    }
  });

  return httpServer;
}
