import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  SALT: process.env.SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  DB: process.env.DB,
  REMOTE_FRONTEND_URL: process.env.REMOTE_FRONTEND_URL,
};
