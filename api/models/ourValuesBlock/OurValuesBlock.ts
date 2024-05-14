import { model, Schema } from 'mongoose';
import { OurValuesBlockCard } from '../../types';

const OurValuesBlockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: [
        {
          cardTitle: {
            type: String,
            required: true,
          },
          cardDescription: {
            type: String,
            required: true,
          },
          cardIcon: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      validate: [
        {
          validator: function (cards: OurValuesBlockCard[]) {
            return cards.length > 0 && cards.length <= 3;
          },
          message: 'Cards array must contain between 1 and 3 cards',
        },
      ],
    },
  },
  { versionKey: false },
);

const OurValuesBlock = model('OurValuesBlock', OurValuesBlockSchema);

export default OurValuesBlock;
