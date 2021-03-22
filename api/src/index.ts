import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server running correctly twice',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
