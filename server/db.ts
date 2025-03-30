/**
 * MOCK DATABASE CONNECTION FOR TESTING
 * 
 * This is a simple in-memory database implementation for testing
 */

import * as schema from "@shared/schema";

// In-memory database for testing
class InMemoryDB {
  private data: Record<string, any[]> = {
    users: [],
    userAchievements: [],
    userLifelines: [],
    gameProgress: []
  };
  private autoIncrementIds: Record<string, number> = {
    users: 0,
    userAchievements: 0,
    userLifelines: 0,
    gameProgress: 0
  };

  // Common database operations
  async select(table: string) {
    return {
      from: () => ({
        where: (condition: any) => ({
          limit: (n: number) => {
            const results = this.data[table] || [];
            const filtered = condition ? results.filter(this.processCondition(condition)) : results;
            return filtered.slice(0, n);
          },
          execute: () => {
            const results = this.data[table] || [];
            return condition ? results.filter(this.processCondition(condition)) : results;
          }
        }),
        execute: () => this.data[table] || []
      })
    };
  }

  async insert(table: string) {
    return {
      values: (data: any) => ({
        returning: async () => {
          const id = ++this.autoIncrementIds[table];
          const newItem = { id, ...data };
          if (!this.data[table]) this.data[table] = [];
          this.data[table].push(newItem);
          return [newItem];
        },
        execute: async () => {
          const id = ++this.autoIncrementIds[table];
          const newItem = { id, ...data };
          if (!this.data[table]) this.data[table] = [];
          this.data[table].push(newItem);
          return newItem;
        }
      })
    };
  }

  async update(table: string) {
    return {
      set: (updates: any) => ({
        where: (condition: any) => ({
          execute: async () => {
            if (!this.data[table]) return;
            const matchingItems = this.data[table].filter(this.processCondition(condition));
            for (const item of matchingItems) {
              Object.assign(item, updates);
            }
            return matchingItems;
          }
        })
      })
    };
  }

  async delete(table: string) {
    return {
      where: (condition: any) => ({
        execute: async () => {
          if (!this.data[table]) return;
          const initialLength = this.data[table].length;
          this.data[table] = this.data[table].filter(item => !this.processCondition(condition)(item));
          return initialLength - this.data[table].length;
        }
      })
    };
  }

  // Helper to process query conditions
  private processCondition(condition: any) {
    return (item: any) => {
      // For simplicity, we'll handle just basic equality comparisons
      if (typeof condition === 'function') {
        return condition(item);
      }
      
      // Support for condition objects like { column: value }
      if (typeof condition === 'object') {
        return Object.entries(condition).every(([key, value]) => item[key] === value);
      }
      
      return true;
    };
  }

  // Debug data
  getTableData(table: string) {
    return this.data[table] || [];
  }

  // Clear data
  clearTable(table: string) {
    this.data[table] = [];
  }
  
  // Initialize demo data
  initializeDemoData() {
    // Create demo user accounts with different expertise levels
    const demoUsers = [
      {
        username: "demo",
        password: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9", // "password" hashed
        level: 5,
        experience: 650,
        coins: 180,
        avatarId: "default",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        lastLoginAt: new Date().toISOString(),
        stats: JSON.stringify({
          questionsAnswered: 45,
          correctAnswers: 36,
          highestStreak: 8,
          topicsExpertise: {
            "Internet Safety": 8,
            "Digital Footprint": 7,
            "Screen Time Management": 6,
            "Cyberbullying": 5,
            "Digital Wellness": 6,
            "Online Identity": 4
          }
        })
      },
      {
        username: "beginner",
        password: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9", // "password" hashed
        level: 2,
        experience: 150,
        coins: 80,
        avatarId: "default",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        lastLoginAt: new Date().toISOString(),
        stats: JSON.stringify({
          questionsAnswered: 10,
          correctAnswers: 7,
          highestStreak: 3,
          topicsExpertise: {
            "Internet Safety": 3,
            "Digital Footprint": 2,
            "Screen Time Management": 1,
            "Digital Wellness": 1
          }
        })
      },
      {
        username: "expert",
        password: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9", // "password" hashed
        level: 10,
        experience: 2500,
        coins: 450,
        avatarId: "default",
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
        lastLoginAt: new Date().toISOString(),
        stats: JSON.stringify({
          questionsAnswered: 95,
          correctAnswers: 87,
          highestStreak: 20,
          topicsExpertise: {
            "Internet Safety": 18,
            "Digital Footprint": 22,
            "Screen Time Management": 15,
            "Cyberbullying": 19,
            "Digital Wellness": 8,
            "Digital Literacy": 5
          }
        })
      }
    ];
    
    // Insert demo users
    demoUsers.forEach(user => {
      this.autoIncrementIds.users++;
      const id = this.autoIncrementIds.users;
      this.data.users.push({ id, ...user });
      
      // Add lifelines for each demo user
      this.autoIncrementIds.userLifelines++;
      this.data.userLifelines.push({
        id: this.autoIncrementIds.userLifelines,
        userId: id,
        fiftyFifty: 3,
        askExpert: 3,
        lastRefreshedAt: new Date().toISOString()
      });
      
      // Add some game progress
      const topics = ["Internet Safety", "Digital Footprint", "Screen Time Management", "Cyberbullying", "Digital Wellness"];
      const difficulties = ["beginner", "intermediate", "advanced"];
      
      // Add more game progress records for higher level users
      const progressCount = user.level <= 2 ? 8 : (user.level <= 5 ? 25 : 95);
      
      for (let i = 0; i < progressCount; i++) {
        this.autoIncrementIds.gameProgress++;
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        const isCorrect = Math.random() > 0.3; // 70% correct answer rate
        
        this.data.gameProgress.push({
          id: this.autoIncrementIds.gameProgress,
          userId: id,
          questionId: `q${Math.floor(Math.random() * 10) + 1}`,
          answeredCorrectly: isCorrect,
          difficulty: randomDifficulty,
          topic: randomTopic,
          answeredAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });
    
    console.log(`Demo data initialized with ${demoUsers.length} users`);
  }
}

console.warn('WARNING: Using in-memory database - data will not persist between restarts');

export const db = new InMemoryDB();
// Initialize demo data on startup
db.initializeDemoData(); 