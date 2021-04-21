import mongoose from 'mongoose';
const schema = mongoose.Schema;

interface IBoard {
  user_id: string;
  private: boolean;
  title: string;
}

interface boardDoc extends mongoose.Document {
  user_id: string;
  private: boolean;
  title: string;
}

interface boardModelInterface extends mongoose.Model<boardDoc> {
  newBoard(attr: IBoard): boardDoc;
}

const boardSchema = new schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

boardSchema.statics.newBoard = (attr: IBoard) => {
  return new Board(attr);
};

const Board = mongoose.model<any, boardModelInterface>('Board', boardSchema);
export { Board };
