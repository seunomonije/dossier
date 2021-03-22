import mongoose from 'mongoose';
const schema = mongoose.Schema;

enum moduleTypes {
  TWITTER = 'TWITTER',
  REDDIT = 'REDDIT',
  HACKERNEWS = 'HACKERNEWS',
  OTHER = 'OTHER',
}

interface IModule {
  user_id: string;
  board_id: string;
  ref_link: string;
  type: moduleTypes;
  up_down: number;
}

interface moduleDoc extends mongoose.Document {
  user_id: string;
  board_id: string;
  ref_link: string;
  type: moduleTypes;
  up_down: number;
}

interface moduleModelInterface extends mongoose.Model<moduleDoc> {
  newModule(attr: IModule): moduleDoc;
}

const moduleSchema = new schema({
  user_id: {
    type: String,
    required: true,
  },
  board_id: {
    type: String,
    required: true,
  },
  ref_link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(moduleTypes),
    default: moduleTypes.TWITTER,
    required: true,
  },
  up_down: {
    type: Number,
    required: true,
  },
});

moduleSchema.statics.newModel = (attr: IModule) => {
  return new Module(attr);
};

const Module = mongoose.model<any, moduleModelInterface>(
  'Module',
  moduleSchema
);
