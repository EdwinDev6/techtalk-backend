import { config } from "dotenv";
config({ path: "../src/.env" });

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/techtalkdb";
export const PORT = process.env.PORT;
export const SECRET = "a-ochoa-lo-mataron-a-balasos";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
