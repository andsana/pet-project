import express from 'express';
import mongoose, { Types } from 'mongoose';
import OurValuesBlock from '../models/ourValuesBlock/OurValuesBlock';
import { OurValuesBlockCard, OurValuesBlockMutation } from '../types';
import { imagesUpload } from '../multer';

const ourValuesBlockRouter = express.Router();

ourValuesBlockRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const { title, cards } = req.body;

    if (!Array.isArray(cards)) {
      return res.status(422).send({ error: 'Cards should be an array' });
    }

    if (cards.length > 3) {
      return res.status(422).send({ error: 'Cannot exceed three cards' });
    }

    const processedCards = cards.map((card) => ({
      ...card,
      cardIcon: req.file ? req.file.filename : card.cardIcon,
    }));

    const ourValuesBlockData = {
      title,
      cards: processedCards,
    };

    await OurValuesBlock.deleteMany({});
    const result = new OurValuesBlock(ourValuesBlockData);
    await result.save();

    return res.send(result);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

ourValuesBlockRouter.get('/', async (_req, res, next) => {
  try {
    const result = await OurValuesBlock.find();

    res.send(result);
  } catch (e) {
    return next(e);
  }
});

ourValuesBlockRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId' });
    }

    const block = await OurValuesBlock.findById(_id);
    return res.send(block);
  } catch (e) {
    return next(e);
  }
});

ourValuesBlockRouter.patch('/:id', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const title = req.body.title;
    const cards = [];

    for (let i = 0; i <= 2; i++) {
      const cardData: OurValuesBlockCard = {
        cardTitle: req.body[`cardTitle${i}`],
        cardText: req.body[`cardText${i}`],
        cardIcon: req.file ? req.file.filename : null,
      };

      cards.push(cardData);
    }

    const result = await OurValuesBlock.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: title,
          cards: cards,
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

ourValuesBlockRouter.delete('/:id', async (req, res, next) => {
  try {
    const block = await OurValuesBlock.findById(req.params.id);

    if (!block) {
      return res.status(400).send({ error: 'This block does not exist' });
    }

    await OurValuesBlock.deleteOne({ _id: req.params.id });
    res.send('deleted');
  } catch (error) {
    return next(error);
  }
});

export default ourValuesBlockRouter;
