import mongoose, { Schema } from 'mongoose';

interface IContent {
  module_id: string;
  title: string;
  text: string;
  image?: string;
}

interface contentDoc extends IContent, mongoose.Document {}

interface contentModelInterface extends mongoose.Model<contentDoc> {
  newContent(attr: IContent): contentDoc;
}

const contentSchema = new Schema(
  {
    module_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    user_id: {
      text: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

contentSchema.statics.newContent = (attr: IContent) => {
  return new Content(attr);
};

const Content = mongoose.model<any, contentModelInterface>(
  'Content',
  contentSchema
);
