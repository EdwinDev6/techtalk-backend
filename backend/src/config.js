import { config } from "dotenv";
config({ path: "../src/.env" });

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://edwinmendoza0620:Jdss2901jd@cluster0.apvuvjc.mongodb.net/techtalkdb?retryWrites=true&w=majority";
export const PORT = process.env.PORT;
export const SECRET = "a-ochoa-lo-mataron-a-balasos";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export const CLOUD_NAME= process.env.CLOUD_NAME || "dipcznkms";
export const API_KEY=process.env.API_KEY || "765824697492641";
export const API_SECRET= process.env.API_SECRET || "zjm-wCIqMszTmIVjPDTLQP4LkaE";

