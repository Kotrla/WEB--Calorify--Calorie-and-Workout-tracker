import cors from 'cors';
import express from 'express';
import config from './config/config';
import routes from './routes.js';
import { corsHeader } from './middleware/corsHeader';
import connectToDatabase from './utils/connectDatabase';

const app = express();
const DB = config.DB || '';
const PORT = config.PORT || 5001;

app.use(express.json(), cors(), corsHeader);

app.listen(PORT, () => {
  routes(app);
  connectToDatabase(DB);

  console.log(`Listening on port ${PORT}`);
});
