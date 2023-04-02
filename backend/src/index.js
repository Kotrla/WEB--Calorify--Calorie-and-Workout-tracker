import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();

dotenv.config();
// app.use(express.json());
// app.use(cors());

app.use(express.json(), cors(), function ( _, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});
    
mongoose
  .connect('mongodb://localhost/calorify-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Succesfully connected to database.'))
  .catch((err) => console.log('Couldnt connect to database', err));

const PORT = process.env.PORT;

app.listen(PORT);

routes(app);

console.log('Listening on port 5001..', PORT);
