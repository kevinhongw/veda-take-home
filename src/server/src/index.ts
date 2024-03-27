import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

import routes from './routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/v1', routes);

app.get('*', (req: Request, res: Response) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
