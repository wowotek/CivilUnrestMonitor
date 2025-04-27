import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/drizzle",
  schema: "./src/repository/dto",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/postgres",
  },
});
