import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'markai-super-secret-jwt-key-2026',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || ''
};
