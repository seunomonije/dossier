import mongoose from 'mongoose';
const schema = mongoose.Schema;

enum moduleTypes {
  TWITTER = 'TWITTER',
  REDDIT = 'REDDIT',
  HACKERNEWS = 'HACKERNEWS',
  OTHER = 'OTHER',
}

interface IBoardUser {
  user_id: string;
  board_id: string;
}

interface boardUserDoc extends mongoose.Document {
  user_id: string;
  board_id: string;
}

interface boardUserModelInterface extends mongoose.Model<boardUserDoc> {
  newModule(attr: IBoardUser): boardUserDoc;
}

const boardUserSchema = new schema({
  user_id: {
    type: String,
    required: true,
  },
  board_id: {
    type: String,
    required: true,
  },
});

boardUserSchema.statics.newBoardUser = (attr: IBoardUser) => {
  return new BoardUser(attr);
};

const BoardUser = mongoose.model<any, boardUserModelInterface>(
  'BoardUser',
  boardUserSchema
);
export { BoardUser };
