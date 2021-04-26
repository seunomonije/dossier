import mongoose, { Schema } from 'mongoose';

interface IContent {
  board_id: string;
  user_id: string;
  title: string;
  text: string;
  image?: string;
  url: string;
}

interface contentDoc extends IContent, mongoose.Document {}

interface contentModelInterface extends mongoose.Model<contentDoc> {
  newContent(attr: IContent): contentDoc;
}

const contentSchema = new Schema(
  {
    board_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

contentSchema.statics.newContent = (attr: IContent) => {
  return new Content(attr);
};

export const Content = mongoose.model<any, contentModelInterface>(
  'Content',
  contentSchema
);
