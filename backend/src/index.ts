import cors from 'cors';
import express from 'express';
import routes from './routes.js';
import config from './config/config.js';
import { corsHeader } from './middleware/corsHeader.js';
import connectToDatabase from './utils/connectDatabase.js';

const app = express();
const DB = config.DB;
const PORT = config.PORT;

app.use(express.json(), cors(), corsHeader);

app.listen(PORT, () => {
	routes(app);
	connectToDatabase(DB);

	console.log(`Listening on port ${PORT}`);
});
