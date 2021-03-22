import mongoose from 'mongoose';
let database: mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri = 'mongodb://localhost:27017';
  if (database) {
    return;
  }

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
