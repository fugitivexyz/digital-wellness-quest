import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  level: integer("level").notNull().default(1),
  experience: integer("experience").notNull().default(0),
  coins: integer("coins").notNull().default(0),
  avatarId: text("avatar_id").default("default"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
  stats: jsonb("stats").default({
    questionsAnswered: 0,
    correctAnswers: 0,
    highestStreak: 0,
    topicsExpertise: {}
  }).$type<{
    questionsAnswered: number;
    correctAnswers: number;
    highestStreak: number;
    topicsExpertise: Record<string, number>;
  }>(),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const userLifelines = pgTable("user_lifelines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  fiftyFifty: integer("fifty_fifty").notNull().default(3),
  askExpert: integer("ask_expert").notNull().default(3),
  lastRefreshedAt: timestamp("last_refreshed_at").defaultNow().notNull(),
});

export const gameProgress = pgTable("game_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  questionId: text("question_id").notNull(),
  answeredCorrectly: boolean("answered_correctly").notNull(),
  difficulty: text("difficulty").notNull(),
  topic: text("topic").notNull(),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
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
