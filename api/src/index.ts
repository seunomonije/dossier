// @ts-nocheck
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
const corsOptions = {
  origin: '*',
};
app.use(cors({ origin: true }));
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

  const user = await firebase
    .auth()
    .verifyIdToken(req.headers.authorization)
    .catch((err) => console.error(err));

  if (user) {
    req.user = user;
    console.log(user);
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
  console.log('Starting');

  const baseURL = 'http://localhost:5050/scraper?url=';
  const { url } = req.body;
  const reqURL = baseURL + url;
  const result = await axios
    .get(reqURL)
    .then((res) => {
      console.log('Value:', res.data);
      return res.data;
    })
    .catch((err) => console.error(err));

  console.log('Data', result);

  const { block_description, block_image_url, block_title, block_url } = result;
  const { uid } = req.user;

  const newContent = Content.newContent({
    module_id: '0',
    title: block_title ? block_title : 'No title available',
    text: block_description ? block_description : 'No text available',
    image: block_image_url || null,
    user_id: uid,
    url: block_url,
  });

  console.log(newContent);
  await newContent.save();

  return res.status(201).json(newContent);
});

app.get('/content', (req: IUserRequest, res: Response) => {
  const { uid } = req.user;

  Content.find({ user_id: uid }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching data',
      });
    } else {
      return res.status(200).json({
        content: result,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
