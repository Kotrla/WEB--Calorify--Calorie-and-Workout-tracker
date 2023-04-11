import * as dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });
export default {
    PORT: process.env.PORT,
    SALT: process.env.SALT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB: process.env.DB,
    REMOTE_FRONTEND_URL: process.env.REMOTE_FRONTEND_URL,
};
//# sourceMappingURL=config.js.map