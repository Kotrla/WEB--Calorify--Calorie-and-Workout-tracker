import { IRequestUserInterface } from '../models/user-auth-info-request.model';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      SALT: number,
      JWT_SECRET: string,
      DB: string,
      REMOTE_FRONTEND_URL: string
    }
  }

  namespace Express {
    interface Request {
      user: IRequestUserInterface
    }
  }
}
