import mongoose from 'mongoose';
const schema = mongoose.Schema;

interface IUser {
  user_id: string;
  username: string;
  image_url?: string;
}

interface userDoc extends mongoose.Document {
  user_id: string;
  username: string;
  image_url?: string;
}

interface userModelInterface extends mongoose.Model<userDoc> {
  newUser(attr: IUser): userDoc;
}

const userSchema = new schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.newUser = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<any, userModelInterface>('User', userSchema);

export { User };
