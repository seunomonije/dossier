import express, { NextFunction, Request, Response } from 'express';
import { connect } from './db/db';
import { User } from './db/User';
import { Content } from './db/Content';
import axios from 'axios';
const cors = require('cors');
import firebase from './firebase';
// import * as cors from 'cors';

connect();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

interface IUserRequest extends Request {
  user: any;
}

const verifyToken = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      error: {
        message: 'You did not specify any idToken for this request',
      },
    });
  }

  const user = await firebase.auth().verifyIdToken(req.headers.authorization);

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      error: {
        message:
          'You are not authorised to perform this action. SignUp/Login to continue',
      },
    });
  }
};

app.use(verifyToken);

app.get('/', (req: IUserRequest, res: Response) => {
  res.status(200).json({
    message: 'Server running correctly',
  });
});

app.post('/content', async (req: IUserRequest, res: Response) => {
  const { url } = req.body;
  const result = axios.get(url).then((res) => res.data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
