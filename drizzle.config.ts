import { defineConfig } from "drizzle-kit";
import path from 'path';

export default defineConfig({
  schema: './shared/schema.ts',
  driver: 'better-sqlite',
  out: './migrations',
  dbCredentials: {
    url: path.join(process.cwd(), 'data', 'cyberquest.db')
  }
});
