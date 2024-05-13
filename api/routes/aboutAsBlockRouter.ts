import express from 'express';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import AboutAsBlock from '../models/aboutAsBlock/AboutAsBlock';
import { AboutAsBlockMutation } from '../types';

const aboutAsBlockRouter = express.Router();
aboutAsBlockRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const aboutAsBlockData: AboutAsBlockMutation = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    const result = new AboutAsBlock(aboutAsBlockData);
    await result.save();

    return res.send(result);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

aboutAsBlockRouter.get('/', async (_req, res, next) => {
  try {
    const result = await AboutAsBlock.find();

    res.send(result);
  } catch (e) {
    return next(e);
  }
});

aboutAsBlockRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const result = await AboutAsBlock.findById(_id);

    if (!result) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(result);
  } catch (e) {
    next(e);
  }
});

aboutAsBlockRouter.patch('/:id', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const result = await AboutAsBlock.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.file ? req.file.filename : null,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Not found!' });
    }

    return res.send({ message: 'ok' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

aboutAsBlockRouter.delete('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const result = await AboutAsBlock.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).send({
        error: 'Vacancy not found or already deleted',
      });
    }

    return res.send({ message: 'success!' });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return res.status(400).send({ error: 'Invalid ID' });
    }

    next(e);
  }
});

export default aboutAsBlockRouter;
