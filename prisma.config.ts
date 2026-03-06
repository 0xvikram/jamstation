import { defineConfig, env } from "@prisma/config"; // Import 'env' helper
import "dotenv/config";
import path from "path";
import * as dotenv from "dotenv";

// Manually point to .env.local since Prisma looks for .env by default
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use the env() helper instead of process.env
    url: env("DATABASE_URL"),
  },
});