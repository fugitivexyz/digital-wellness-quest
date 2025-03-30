import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  level: integer("level").notNull().default(1),
  experience: integer("experience").notNull().default(0),
  coins: integer("coins").notNull().default(0),
  avatarId: text("avatar_id").default("default"),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  lastLoginAt: text("last_login_at").default(String(new Date().toISOString())),
  stats: text("stats", { mode: "json" }).default(JSON.stringify({
    questionsAnswered: 0,
    correctAnswers: 0,
    highestStreak: 0,
    topicsExpertise: {}
  })).$type<{
    questionsAnswered: number;
    correctAnswers: number;
    highestStreak: number;
    topicsExpertise: Record<string, number>;
  }>(),
});

export const userAchievements = sqliteTable("user_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: text("unlocked_at").default(String(new Date().toISOString())),
});

export const userLifelines = sqliteTable("user_lifelines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  fiftyFifty: integer("fifty_fifty").notNull().default(3),
  askExpert: integer("ask_expert").notNull().default(3),
  lastRefreshedAt: text("last_refreshed_at").default(String(new Date().toISOString())),
});

export const gameProgress = sqliteTable("game_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  questionId: text("question_id").notNull(),
  answeredCorrectly: integer("answered_correctly", { mode: "boolean" }).notNull(),
  difficulty: text("difficulty").notNull(),
  topic: text("topic").notNull(),
  answeredAt: text("answered_at").default(String(new Date().toISOString())),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type UserLifeline = typeof userLifelines.$inferSelect;
export type GameProgress = typeof gameProgress.$inferSelect;
