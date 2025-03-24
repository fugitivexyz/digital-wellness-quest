import { users, type User, type InsertUser, type UserAchievement, type UserLifeline, type GameProgress, gameProgress, userLifelines, userAchievements } from "@shared/schema";
import { questions, achievements, avatars } from "@shared/data/questions";
import { Achievement } from "@shared/types/game";
import { db } from "./db";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateLastLogin(userId: number): Promise<void>;
  getUserAchievements(userId: number): Promise<Achievement[]>;
  getUserLifelines(userId: number): Promise<{ fiftyFifty: number; askExpert: number }>;
  createLifelines(userId: number): Promise<void>;
  refreshLifelines(userId: number): Promise<void>;
  saveGameProgress(progress: { userId: number; questionId: string; answeredCorrectly: boolean; difficulty: string; topic: string }): Promise<void>;
  updateUserStats(userId: number, stats: any): Promise<void>;
  updateUserRewards(userId: number, experience: number, coins: number, stats: any): Promise<void>;
  updateUserCoins(userId: number, amount: number): Promise<void>;
  checkAndUnlockAchievements(userId: number): Promise<Achievement[]>;
  purchaseAvatar(userId: number, avatarId: string): Promise<void>;
  selectAvatar(userId: number, avatarId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userAchievements: Map<number, UserAchievement[]>;
  private userLifelines: Map<number, UserLifeline>;
  private gameProgress: Map<number, GameProgress[]>;
  private userAvatars: Map<number, string[]>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.userAchievements = new Map();
    this.userLifelines = new Map();
    this.gameProgress = new Map();
    this.userAvatars = new Map();
    this.currentId = 1;
    
    // Create a demo user
    this.createUser({
      username: "demo",
      password: "password"
    }).then(user => {
      this.updateUserRewards(user.id, 750, 1250, {
        questionsAnswered: 124,
        correctAnswers: 108,
        highestStreak: 9,
        topicsExpertise: {
          "Phishing & Social Engineering": 40,
          "Password Security": 30,
          "Social Media Safety": 20,
          "Device Security": 10
        }
      });
      this.selectAvatar(user.id, "default");
      
      // Unlock some achievements for demo user
      this.unlockAchievement(user.id, "phishing-expert");
      this.unlockAchievement(user.id, "streak-5");
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      level: 1,
      experience: 0,
      coins: 0,
      avatarId: "default",
      createdAt: new Date(),
      lastLoginAt: new Date(),
      stats: {
        questionsAnswered: 0,
        correctAnswers: 0,
        highestStreak: 0,
        topicsExpertise: {}
      }
    };
    this.users.set(id, user);
    
    // Initialize default avatars
    this.userAvatars.set(id, ["default", "robot", "hacker"]);
    
    return user;
  }

  async updateLastLogin(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.lastLoginAt = new Date();
      this.users.set(userId, user);
    }
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    const userAchievements = this.userAchievements.get(userId) || [];
    
    return achievements.map(achievement => {
      const unlocked = userAchievements.some(ua => ua.achievementId === achievement.id);
      const unlockedAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
      
      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        unlocked,
        unlockedAt: unlockedAchievement?.unlockedAt,
        icon: achievement.icon,
        reward: achievement.reward
      };
    });
  }

  async getUserLifelines(userId: number): Promise<{ fiftyFifty: number; askExpert: number }> {
    const lifelines = this.userLifelines.get(userId);
    if (!lifelines) {
      return { fiftyFifty: 0, askExpert: 0 };
    }
    
    return {
      fiftyFifty: lifelines.fiftyFifty,
      askExpert: lifelines.askExpert
    };
  }

  async createLifelines(userId: number): Promise<void> {
    this.userLifelines.set(userId, {
      id: userId,
      userId,
      fiftyFifty: 3,
      askExpert: 3,
      lastRefreshedAt: new Date()
    });
  }

  async refreshLifelines(userId: number): Promise<void> {
    const lifelines = this.userLifelines.get(userId);
    if (lifelines) {
      lifelines.fiftyFifty = 3;
      lifelines.askExpert = 3;
      lifelines.lastRefreshedAt = new Date();
      this.userLifelines.set(userId, lifelines);
    }
  }

  async saveGameProgress(progress: { userId: number; questionId: string; answeredCorrectly: boolean; difficulty: string; topic: string }): Promise<void> {
    const userProgress = this.gameProgress.get(progress.userId) || [];
    
    userProgress.push({
      id: userProgress.length + 1,
      userId: progress.userId,
      questionId: progress.questionId,
      answeredCorrectly: progress.answeredCorrectly,
      difficulty: progress.difficulty,
      topic: progress.topic,
      answeredAt: new Date()
    });
    
    this.gameProgress.set(progress.userId, userProgress);
  }

  async updateUserStats(userId: number, stats: any): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.stats = stats;
      this.users.set(userId, user);
    }
  }

  async updateUserRewards(userId: number, experience: number, coins: number, stats: any): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.experience += experience;
      user.coins += coins;
      user.stats = stats;
      
      // Check if user leveled up
      const experienceForNextLevel = user.level * 1000;
      if (user.experience >= experienceForNextLevel) {
        user.level += 1;
        user.experience -= experienceForNextLevel;
      }
      
      this.users.set(userId, user);
    }
  }

  async updateUserCoins(userId: number, amount: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.coins += amount;
      this.users.set(userId, user);
    }
  }

  async checkAndUnlockAchievements(userId: number): Promise<Achievement[]> {
    const user = await this.getUser(userId);
    if (!user) return [];
    
    const userProgress = this.gameProgress.get(userId) || [];
    const unlockedAchievements: Achievement[] = [];
    
    // Check each achievement
    for (const achievement of achievements) {
      // Skip already unlocked achievements
      const userAchievements = this.userAchievements.get(userId) || [];
      if (userAchievements.some(ua => ua.achievementId === achievement.id)) {
        continue;
      }
      
      let shouldUnlock = false;
      
      switch (achievement.requirement.type) {
        case 'questions_by_difficulty':
          const correctByDifficulty = userProgress.filter(
            p => p.difficulty === achievement.requirement.difficulty && p.answeredCorrectly
          ).length;
          shouldUnlock = correctByDifficulty >= achievement.requirement.count;
          break;
          
        case 'correct_by_topic':
          const correctByTopic = userProgress.filter(
            p => p.topic === achievement.requirement.topic && p.answeredCorrectly
          ).length;
          shouldUnlock = correctByTopic >= achievement.requirement.count;
          break;
          
        case 'all_in_topic':
          const topicQuestions = questions.filter(q => q.topic === achievement.requirement.topic);
          const answeredTopicQuestions = userProgress.filter(
            p => p.topic === achievement.requirement.topic && p.answeredCorrectly
          );
          shouldUnlock = answeredTopicQuestions.length === topicQuestions.length;
          break;
          
        case 'streak':
          shouldUnlock = user.stats.highestStreak >= achievement.requirement.count;
          break;
          
        case 'all_topics':
          const uniqueTopics = [...new Set(questions.map(q => q.topic))];
          const answeredTopics = [...new Set(userProgress.filter(p => p.answeredCorrectly).map(p => p.topic))];
          shouldUnlock = uniqueTopics.every(topic => answeredTopics.includes(topic));
          break;
      }
      
      if (shouldUnlock) {
        await this.unlockAchievement(userId, achievement.id);
        
        // Add rewards
        await this.updateUserRewards(
          userId,
          achievement.reward.xp,
          achievement.reward.coins,
          user.stats
        );
        
        // Add to return list
        const achievementWithUnlockInfo = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
        unlockedAchievements.push(achievementWithUnlockInfo);
      }
    }
    
    return unlockedAchievements;
  }

  async unlockAchievement(userId: number, achievementId: string): Promise<void> {
    const userAchievements = this.userAchievements.get(userId) || [];
    
    // Skip if already unlocked
    if (userAchievements.some(ua => ua.achievementId === achievementId)) {
      return;
    }
    
    userAchievements.push({
      id: userAchievements.length + 1,
      userId,
      achievementId,
      unlockedAt: new Date()
    });
    
    this.userAchievements.set(userId, userAchievements);
  }

  async purchaseAvatar(userId: number, avatarId: string): Promise<void> {
    const userAvatars = this.userAvatars.get(userId) || [];
    
    if (!userAvatars.includes(avatarId)) {
      userAvatars.push(avatarId);
      this.userAvatars.set(userId, userAvatars);
    }
  }

  async selectAvatar(userId: number, avatarId: string): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      const userAvatars = this.userAvatars.get(userId) || [];
      
      // Check if user has this avatar
      if (!userAvatars.includes(avatarId)) {
        throw new Error("Avatar not owned");
      }
      
      user.avatarId = avatarId;
      this.users.set(userId, user);
    }
  }
}

export class DatabaseStorage implements IStorage {
  private userAvatarsTable = "user_avatars";

  constructor() {
    // Create a demo user for testing once database is setup
    this.createDemoUserIfNotExists();
  }

  private async createDemoUserIfNotExists() {
    const demoUser = await this.getUserByUsername("demo");
    if (!demoUser) {
      const user = await this.createUser({
        username: "demo",
        password: "password"
      });

      await this.updateUserRewards(user.id, 750, 1250, {
        questionsAnswered: 124,
        correctAnswers: 108,
        highestStreak: 9,
        topicsExpertise: {
          "Phishing & Social Engineering": 40,
          "Password Security": 30,
          "Social Media Safety": 20,
          "Device Security": 10
        }
      });

      // Create default avatars
      try {
        await db.execute(sql`CREATE TABLE IF NOT EXISTS user_avatars (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          avatar_id TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`);

        for (const avatarId of ["default", "robot", "hacker"]) {
          await db.execute(sql`
            INSERT INTO user_avatars (user_id, avatar_id)
            VALUES (${user.id}, ${avatarId})
          `);
        }
      } catch (error) {
        console.error("Error creating user_avatars table:", error);
      }
      
      await this.selectAvatar(user.id, "default");
      
      // Unlock some achievements for demo user
      await this.unlockAchievement(user.id, "phishing-expert");
      await this.unlockAchievement(user.id, "streak-5");
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const defaultStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      highestStreak: 0,
      topicsExpertise: {}
    };

    const [user] = await db.insert(users)
      .values({
        ...insertUser,
        level: 1,
        experience: 0,
        coins: 0,
        avatarId: "default",
        stats: defaultStats
      })
      .returning();
    
    // Create lifelines for the user
    await this.createLifelines(user.id);
    
    return user;
  }

  async updateLastLogin(userId: number): Promise<void> {
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, userId));
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    const userAchievementsData = await db.select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    
    return achievements.map(achievement => {
      const unlocked = userAchievementsData.some(ua => ua.achievementId === achievement.id);
      const unlockedAchievement = userAchievementsData.find(ua => ua.achievementId === achievement.id);
      
      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        unlocked,
        unlockedAt: unlockedAchievement?.unlockedAt,
        icon: achievement.icon,
        reward: achievement.reward
      };
    });
  }

  async getUserLifelines(userId: number): Promise<{ fiftyFifty: number; askExpert: number }> {
    const [lifelines] = await db.select()
      .from(userLifelines)
      .where(eq(userLifelines.userId, userId));
    
    if (!lifelines) {
      return { fiftyFifty: 0, askExpert: 0 };
    }
    
    return {
      fiftyFifty: lifelines.fiftyFifty,
      askExpert: lifelines.askExpert
    };
  }

  async createLifelines(userId: number): Promise<void> {
    await db.insert(userLifelines)
      .values({
        userId,
        fiftyFifty: 3,
        askExpert: 3,
        lastRefreshedAt: new Date()
      });
  }

  async refreshLifelines(userId: number): Promise<void> {
    await db.update(userLifelines)
      .set({
        fiftyFifty: 3,
        askExpert: 3,
        lastRefreshedAt: new Date()
      })
      .where(eq(userLifelines.userId, userId));
  }

  async saveGameProgress(progress: { userId: number; questionId: string; answeredCorrectly: boolean; difficulty: string; topic: string }): Promise<void> {
    await db.insert(gameProgress)
      .values({
        userId: progress.userId,
        questionId: progress.questionId,
        answeredCorrectly: progress.answeredCorrectly,
        difficulty: progress.difficulty,
        topic: progress.topic
      });
  }

  async updateUserStats(userId: number, stats: any): Promise<void> {
    await db.update(users)
      .set({ stats })
      .where(eq(users.id, userId));
  }

  async updateUserRewards(userId: number, experience: number, coins: number, stats: any): Promise<void> {
    // Get current user
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return;
    
    // Calculate new values
    let newExperience = user.experience + experience;
    let newLevel = user.level;
    const newCoins = user.coins + coins;
    
    // Check for level up
    const experienceForNextLevel = user.level * 1000;
    if (newExperience >= experienceForNextLevel) {
      newLevel += 1;
      newExperience -= experienceForNextLevel;
    }
    
    // Update the user
    await db.update(users)
      .set({
        experience: newExperience,
        level: newLevel,
        coins: newCoins,
        stats
      })
      .where(eq(users.id, userId));
  }

  async updateUserCoins(userId: number, amount: number): Promise<void> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return;
    
    await db.update(users)
      .set({ coins: user.coins + amount })
      .where(eq(users.id, userId));
  }

  async checkAndUnlockAchievements(userId: number): Promise<Achievement[]> {
    const user = await this.getUser(userId);
    if (!user) return [];
    
    // Get all user progress
    const userProgressData = await db.select()
      .from(gameProgress)
      .where(eq(gameProgress.userId, userId));
    
    // Get all unlocked achievements
    const userAchievementsData = await db.select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    
    const unlockedAchievements: Achievement[] = [];
    
    // Check each achievement
    for (const achievement of achievements) {
      // Skip already unlocked achievements
      if (userAchievementsData.some(ua => ua.achievementId === achievement.id)) {
        continue;
      }
      
      let shouldUnlock = false;
      
      if (achievement.requirement && 'type' in achievement.requirement) {
        switch (achievement.requirement.type) {
          case 'questions_by_difficulty': {
            if (achievement.requirement.difficulty && achievement.requirement.count) {
              const correctByDifficulty = userProgressData.filter(
                p => p.difficulty === achievement.requirement.difficulty && p.answeredCorrectly
              ).length;
              shouldUnlock = correctByDifficulty >= achievement.requirement.count;
            }
            break;
          }
            
          case 'correct_by_topic': {
            if (achievement.requirement.topic && achievement.requirement.count) {
              const correctByTopic = userProgressData.filter(
                p => p.topic === achievement.requirement.topic && p.answeredCorrectly
              ).length;
              shouldUnlock = correctByTopic >= achievement.requirement.count;
            }
            break;
          }
            
          case 'all_in_topic': {
            if (achievement.requirement.topic) {
              const topicQuestions = questions.filter(q => q.topic === achievement.requirement.topic);
              const answeredTopicQuestions = userProgressData.filter(
                p => p.topic === achievement.requirement.topic && p.answeredCorrectly
              );
              shouldUnlock = answeredTopicQuestions.length === topicQuestions.length;
            }
            break;
          }
            
          case 'streak': {
            if (user.stats && achievement.requirement.count) {
              shouldUnlock = user.stats.highestStreak >= achievement.requirement.count;
            }
            break;
          }
            
          case 'all_topics': {
            const uniqueTopics = Array.from(new Set(questions.map(q => q.topic)));
            const answeredTopics = Array.from(new Set(
              userProgressData.filter(p => p.answeredCorrectly).map(p => p.topic)
            ));
            shouldUnlock = uniqueTopics.every(topic => answeredTopics.includes(topic));
            break;
          }
        }
      }
      
      if (shouldUnlock) {
        await this.unlockAchievement(userId, achievement.id);
        
        // Add rewards
        await this.updateUserRewards(
          userId,
          achievement.reward.xp,
          achievement.reward.coins,
          user.stats
        );
        
        // Add to return list
        const achievementWithUnlockInfo = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
        unlockedAchievements.push(achievementWithUnlockInfo);
      }
    }
    
    return unlockedAchievements;
  }

  async unlockAchievement(userId: number, achievementId: string): Promise<void> {
    // Check if already unlocked
    const [existing] = await db.select()
      .from(userAchievements)
      .where(
        and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        )
      );
      
    if (existing) return;
    
    // Insert new achievement
    await db.insert(userAchievements)
      .values({
        userId,
        achievementId,
        unlockedAt: new Date()
      });
  }

  async purchaseAvatar(userId: number, avatarId: string): Promise<void> {
    // Check if avatar already owned
    const [existing] = await db.execute(sql`
      SELECT * FROM ${sql.identifier(this.userAvatarsTable)}
      WHERE user_id = ${userId} AND avatar_id = ${avatarId}
    `);
    
    if (!existing) {
      await db.execute(sql`
        INSERT INTO ${sql.identifier(this.userAvatarsTable)} (user_id, avatar_id)
        VALUES (${userId}, ${avatarId})
      `);
    }
  }

  async selectAvatar(userId: number, avatarId: string): Promise<void> {
    // Check if avatar is owned
    const [existing] = await db.execute(sql`
      SELECT * FROM ${sql.identifier(this.userAvatarsTable)}
      WHERE user_id = ${userId} AND avatar_id = ${avatarId}
    `);
    
    if (!existing) {
      throw new Error("Avatar not owned");
    }
    
    // Update user's avatar
    await db.update(users)
      .set({ avatarId })
      .where(eq(users.id, userId));
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
