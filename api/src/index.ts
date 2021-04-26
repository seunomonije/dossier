// @ts-nocheck
import express, { NextFunction, Request, Response } from 'express';
import { connect } from './db/db';
import { Content } from './db/Content';
import axios from 'axios';
import firebase from './firebase';
import { Board } from './db/Board';
import { BoardUser } from './db/BoardUser';
const cors = require('cors');
import { ObjectID } from 'mongodb';
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
  const baseURL = 'http://localhost:5050/scraper?url=';
  console.log(req.body);
  const { url, board_id } = req.body;
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
    board_id: board_id,
    title: block_title ? block_title : 'No title available',
    text: block_description ? block_description : 'No text available',
    image: block_image_url || null,
    user_id: uid,
    url: block_url,
  });

  const savedContent = await newContent.save();

  return res.status(201).json(savedContent);
});

app.get('/content/:board_id', async (req: IUserRequest, res: Response) => {
  const { board_id } = req.params;

  try {
    const result = await Content.find({ board_id: board_id });
    return res.status(200).json({
      content: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching data',
    });
  }
});

// Get the boards a user has
app.get('/boards', async (req: IUserRequest, res: Response) => {
  const { uid } = req.user;

  let boards = [];
  // Find the boards that a user is subscribed to
  try {
    const boardUsers = await BoardUser.find({ user_id: uid }).exec();
    boards = boardUsers;
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching data 1',
    });
  }

  let boardIds = [];
  // If user has no board,
  if (boards.length === 0) {
    const newBoard = Board.newBoard({
      user_id: uid,
      private: false,
      title: 'Base board',
    });

    const newBoardObj = await newBoard.save();
    console.log(newBoardObj);
    boardIds = [ObjectID(newBoardObj._id)];

    const newBoardUser = BoardUser.newBoardUser({
      user_id: uid,
      board_id: newBoardObj._id,
    });

    await newBoardUser.save();
  } else {
    boardIds = boards.map((item) => ObjectID(item.board_id));
  }

  console.log('BoardIds', boardIds);
  // Find and return all the boards with specified id
  try {
    const boards = await Board.find({ _id: { $in: boardIds } }).exec();
    return res.status(200).json({
      content: boards,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching data 2',
    });
  }
});

// Create a new board
app.post('/board', async (req: IUserRequest, res: Response) => {
  const { title } = req.body;
  const { uid } = req.user;

  const board = Board.newBoard({
    user_id: uid,
    private: false,
    title: title,
  });

  const savedBoard = await board.save();

  const newBoardUser = BoardUser.newBoardUser({
    user_id: uid,
    board_id: savedBoard._id,
  });

  await newBoardUser.save();

  return res.status(201).json({
    content: savedBoard,
  });
});

// Share board
app.post('/shareboard', async (req: IUserRequest, res: Response) => {
  const { user_email, board_id } = req.body;

  const user_id = await firebase
    .auth()
    .getUserByEmail(user_email)
    .then((res) => {
      console.log(res);
      return res.uid;
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Cannot complete request at this time',
      });
    });

  console.log('User Id', user_id);
  const newBoardUser = BoardUser.newBoardUser({
    user_id: user_id,
    board_id: board_id,
  });

  const savedBU = await newBoardUser.save();
  console.log('Board User', savedBU);

  return res.status(201).json({
    content: 'Success',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
