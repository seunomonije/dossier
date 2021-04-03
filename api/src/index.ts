import express, { Request, Response } from 'express';
import { connect } from './db/db';
const cors = require('cors');
// import * as cors from 'cors';

connect();
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server running correctly',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
