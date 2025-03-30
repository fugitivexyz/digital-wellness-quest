/**
 * MOCK ROUTES FOR TESTING
 * 
 * Instructions:
 * 1. Rename this file to routes.ts to use the mock routes
 * 2. Note: This is for testing only and won't persist data
 */

import express, { type Request, Response } from "express";
import { Server, createServer } from "http";
import { db } from "./db";
import { users, userLifelines, gameProgress, userAchievements } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as crypto from "crypto";

// Simple hash function for passwords (NOT FOR PRODUCTION)
function simpleHash(str: string): string {
  // Use SHA-256 for consistency with demo data
  return crypto.createHash('sha256').update(str).digest('hex');
}

// Sample questions data
const QUESTIONS = [
  {
    id: "q1",
    question: "What is the most common type of attack that involves sending deceptive emails?",
    options: ["Phishing", "DDoS", "SQL Injection", "Cross-site Scripting"],
    correctOption: 0,
    explanation: "Phishing is a type of social engineering attack that involves sending fraudulent messages that appear to come from a trusted source.",
    difficulty: "beginner",
    topic: "Social Engineering",
    points: 10
  },
  {
    id: "q2",
    question: "Which encryption algorithm is considered outdated and insecure?",
    options: ["AES-256", "RSA-2048", "MD5", "Blowfish"],
    correctOption: 2,
    explanation: "MD5 is a cryptographic hash function that is now considered cryptographically broken and unsuitable for further use.",
    difficulty: "intermediate",
    topic: "Cryptography",
    points: 15
  },
  {
    id: "q3",
    question: "What type of attack floods a network with traffic to make a service unavailable?",
    options: ["Man-in-the-Middle", "DDoS", "SQL Injection", "Zero-day Exploit"],
    correctOption: 1,
    explanation: "A Distributed Denial of Service (DDoS) attack attempts to make a service unavailable by overwhelming it with traffic from multiple sources.",
    difficulty: "beginner",
    topic: "Network Security",
    points: 10
  }
];

// Mock lifelines data
const MOCK_LIFELINES = {
  fiftyFifty: 3,
  askExpert: 2,
  lastRefreshedAt: new Date()
};

// This ensures TypeScript recognizes the session properties we add
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: express.Express): Promise<Server> {
  // Create an HTTP server for the Express app
  const server = createServer(app);

  // Auth routes - /api/ endpoints
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      // Log the request body for debugging
      console.log('Registration request:', JSON.stringify(req.body));
      
      const { username, password } = req.body;
      
      if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if username exists
      const selectDb = await db.select("users");
      const existingUser = await selectDb.from().where({username}).limit(1);
      
      if (existingUser.length > 0) {
        console.log('Username already exists:', username);
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Hash password
      const hashedPassword = simpleHash(password);
      
      // Insert user
      const insertDb = await db.insert("users");
      const newUser = await insertDb.values({
        username,
        password: hashedPassword,
        level: 1,
        experience: 0,
        coins: 0,
        avatarId: "default",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        stats: JSON.stringify({
          questionsAnswered: 0,
          correctAnswers: 0,
          highestStreak: 0,
          topicsExpertise: {}
        })
      }).returning();
      
      console.log('User created:', username);
      
      // Create initial lifelines for the user
      if (newUser && newUser.length > 0) {
        const insertLifelineDb = await db.insert("userLifelines");
        await insertLifelineDb.values({
          userId: newUser[0].id,
          fiftyFifty: 3,
          askExpert: 3,
          lastRefreshedAt: new Date().toISOString()
        }).execute();
        console.log('Lifelines created for user:', username);
      }
      
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Error registering user" });
    }
  });
  
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      // Log the request body for debugging
      console.log('Login request:', JSON.stringify(req.body));
      
      const { username, password } = req.body;
      
      if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Find user
      const selectDb = await db.select("users");
      const foundUsers = await selectDb.from().where({username}).limit(1);
      
      if (foundUsers.length === 0) {
        console.log('User not found:', username);
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const user = foundUsers[0];
      
      // Special handling for demo users
      const isDemoUser = ["demo", "beginner", "expert"].includes(username);
      let isPasswordValid = false;
      
      if (isDemoUser && password === "password") {
        isPasswordValid = true;
        console.log('Demo user login bypass activated for:', username);
      } else {
        // Regular password comparison
        const hashedPassword = simpleHash(password);
        console.log('Debug - Stored hash:', user.password);
        console.log('Debug - Calculated hash:', hashedPassword);
        isPasswordValid = user.password === hashedPassword;
      }
      
      if (!isPasswordValid) {
        console.log('Invalid password for user:', username);
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Update last login
      const updateDb = await db.update("users");
      await updateDb
        .set({ lastLoginAt: new Date().toISOString() })
        .where({id: user.id})
        .execute();
      
      // Set session
      req.session.userId = user.id;
      console.log('User logged in:', username, 'ID:', user.id);
      
      // Ensure stats is parsed as an object if it's a string
      if (typeof user.stats === 'string') {
        try {
          user.stats = JSON.parse(user.stats);
        } catch (e) {
          console.error("Error parsing stats JSON:", e);
          user.stats = {
            questionsAnswered: 0,
            correctAnswers: 0,
            highestStreak: 0,
            topicsExpertise: {}
          };
        }
      }
      
      // Make sure topicsExpertise exists
      if (!user.stats || !user.stats.topicsExpertise) {
        if (!user.stats) user.stats = {};
        user.stats.topicsExpertise = {};
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Error logging in" });
    }
  });
  
  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {});
    return res.status(200).json({ message: "Logged out successfully" });
  });

  // Keep backward compatibility with /api/auth/* routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if username exists
      const selectDb = await db.select("users");
      const existingUser = await selectDb.from().where({username}).limit(1);
      
      if (existingUser.length > 0) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Hash password
      const hashedPassword = simpleHash(password);
      
      // Insert user
      const insertDb = await db.insert("users");
      const newUser = await insertDb.values({
        username,
        password: hashedPassword,
        level: 1,
        experience: 0,
        coins: 0,
        avatarId: "default",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        stats: JSON.stringify({
          questionsAnswered: 0,
          correctAnswers: 0,
          highestStreak: 0,
          topicsExpertise: {}
        })
      }).returning();
      
      // Create initial lifelines for the user
      if (newUser && newUser.length > 0) {
        const insertLifelineDb = await db.insert("userLifelines");
        await insertLifelineDb.values({
          userId: newUser[0].id,
          fiftyFifty: 3,
          askExpert: 3,
          lastRefreshedAt: new Date().toISOString()
        }).execute();
      }
      
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Error registering user" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Find user
      const selectDb = await db.select("users");
      const foundUsers = await selectDb.from().where({username}).limit(1);
      
      if (foundUsers.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const user = foundUsers[0];
      
      // Special handling for demo users
      const isDemoUser = ["demo", "beginner", "expert"].includes(username);
      let isPasswordValid = false;
      
      if (isDemoUser && password === "password") {
        isPasswordValid = true;
        console.log('Demo user login bypass activated for:', username);
      } else {
        // Regular password comparison
        const hashedPassword = simpleHash(password);
        isPasswordValid = user.password === hashedPassword;
      }
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Update last login
      const updateDb = await db.update("users");
      await updateDb
        .set({ lastLoginAt: new Date().toISOString() })
        .where({id: user.id})
        .execute();
      
      // Set session
      req.session.userId = user.id;
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Error logging in" });
    }
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {});
    return res.status(200).json({ message: "Logged out successfully" });
  });

  // User routes
  app.get("/api/user/profile", async (req: Request, res: Response) => {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const selectDb = await db.select("users");
      const foundUsers = await selectDb.from().where({id: req.session.userId}).limit(1);
      
      if (foundUsers.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const user = foundUsers[0];
      
      // Ensure stats is parsed as an object if it's a string
      if (typeof user.stats === 'string') {
        try {
          user.stats = JSON.parse(user.stats);
        } catch (e) {
          console.error("Error parsing stats JSON:", e);
          user.stats = {
            questionsAnswered: 0,
            correctAnswers: 0,
            highestStreak: 0,
            topicsExpertise: {}
          };
        }
      }
      
      // Make sure topicsExpertise exists
      if (!user.stats.topicsExpertise) {
        user.stats.topicsExpertise = {};
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({ message: "Error fetching user profile" });
    }
  });

  app.get("/api/user/lifelines", async (req: Request, res: Response) => {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const selectDb = await db.select("userLifelines");
      const userLifelinesResult = await selectDb.from().where({userId: req.session.userId}).limit(1);
      
      if (userLifelinesResult.length === 0) {
        // Create default lifelines if not found
        const insertDb = await db.insert("userLifelines");
        const newLifelines = await insertDb
          .values({
            userId: req.session.userId,
            fiftyFifty: 3,
            askExpert: 3,
            lastRefreshedAt: new Date().toISOString()
          })
          .returning();
          
        return res.status(200).json({
          fiftyFifty: newLifelines[0].fiftyFifty,
          askExpert: newLifelines[0].askExpert,
        });
      }
      
      return res.status(200).json({
        fiftyFifty: userLifelinesResult[0].fiftyFifty,
        askExpert: userLifelinesResult[0].askExpert,
      });
    } catch (error) {
      console.error("Get lifelines error:", error);
      return res.status(500).json({ message: "Error fetching lifelines" });
    }
  });

  // Game routes
  app.get("/api/game/questions", (req: Request, res: Response) => {
    const { difficulty, topic } = req.query;
    
    // Filter questions based on query params
    let filteredQuestions = [...QUESTIONS];
    
    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }
    
    if (topic) {
      filteredQuestions = filteredQuestions.filter(q => q.topic === topic);
    }
    
    return res.status(200).json(filteredQuestions);
  });

  app.post("/api/game/answer", async (req: Request, res: Response) => {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { questionId, answer } = req.body;
    
    if (!questionId || answer === undefined) {
      return res.status(400).json({ message: "Question ID and answer are required" });
    }
    
    // Find the question
    const question = QUESTIONS.find(q => q.id === questionId);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Check if answer is correct
    const isCorrect = answer === question.correctOption;
    
    try {
      // Record answer in game progress
      const insertDb = await db.insert("gameProgress");
      await insertDb.values({
        userId: req.session.userId,
        questionId,
        answeredCorrectly: isCorrect,
        difficulty: question.difficulty,
        topic: question.topic,
        answeredAt: new Date().toISOString()
      }).execute();
      
      // Update user stats if correct
      if (isCorrect) {
        const selectDb = await db.select("users");
        const userResult = await selectDb.from().where({id: req.session.userId}).limit(1);
        
        if (userResult.length > 0) {
          const user = userResult[0];
          const stats = typeof user.stats === 'string' ? JSON.parse(user.stats) : user.stats;
          
          // Update stats
          stats.questionsAnswered = (stats.questionsAnswered || 0) + 1;
          stats.correctAnswers = (stats.correctAnswers || 0) + 1;
          
          // Update expertise for this topic
          if (!stats.topicsExpertise) stats.topicsExpertise = {};
          stats.topicsExpertise[question.topic] = (stats.topicsExpertise[question.topic] || 0) + 1;
          
          // Calculate experience and coins based on difficulty
          let pointsMultiplier = 1;
          if (question.difficulty === 'intermediate') pointsMultiplier = 2;
          if (question.difficulty === 'advanced') pointsMultiplier = 3;
          
          const experienceGained = 10 * pointsMultiplier;
          const coinsGained = 5 * pointsMultiplier;
          
          // Update user
          const updateDb = await db.update("users");
          await updateDb
            .set({
              experience: user.experience + experienceGained,
              coins: user.coins + coinsGained,
              stats: JSON.stringify(stats)
            })
            .where({id: req.session.userId})
            .execute();
            
          return res.status(200).json({
            correct: true,
            explanation: question.explanation,
            pointsEarned: question.points,
            rewards: {
              experience: experienceGained,
              coins: coinsGained
            }
          });
        }
      }
      
      return res.status(200).json({
        correct: isCorrect,
        explanation: question.explanation,
        pointsEarned: isCorrect ? question.points : 0,
        rewards: isCorrect ? {
          experience: 10,
          coins: 5
        } : null
      });
    } catch (error) {
      console.error("Submit answer error:", error);
      return res.status(500).json({ message: "Error processing answer" });
    }
  });

  // Debug endpoint to check database state (remove in production)
  app.get("/api/debug/db", (req: Request, res: Response) => {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ message: "Not found" });
    }
    
    return res.status(200).json({
      users: (db as any).getTableData("users").map((user: any) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      userLifelines: (db as any).getTableData("userLifelines"),
      gameProgress: (db as any).getTableData("gameProgress")
    });
  });

  return server;
} 