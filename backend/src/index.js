import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes.js';
import { corsHeader } from './middleware/corsHeader.js';
import connectToDatabase from './utils/connectDatabase.js';

dotenv.config();

const app = express();
const DB = process.env.DB;
const PORT = process.env.PORT;

app.use(express.json(), cors(), corsHeader);

app.listen(PORT, () => {
    routes(app);
    connectToDatabase(DB);
    
    console.log(`Listening on port ${PORT}`);
});
