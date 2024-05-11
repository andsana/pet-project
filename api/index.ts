import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import pageCreateRouter from './routes/pageCreateRouter';
import headerRouter from './routes/headerRouter';
import imageUploadRouter from './routes/imageUploadRouter';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/page', pageCreateRouter);
app.use('/header', headerRouter);
app.use('/upload-image', imageUploadRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
