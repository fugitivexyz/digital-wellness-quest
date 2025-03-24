import { users, type User, type InsertUser, type UserAchievement, type UserLifeline, type GameProgress } from "@shared/schema";
import { questions, achievements, avatars } from "@shared/data/questions";
import { Achievement } from "@shared/types/game";

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

export const storage = new MemStorage();
