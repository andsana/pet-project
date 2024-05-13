import { model, Schema } from 'mongoose';

const OurValuesBlockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: [
        {
          id: String,
          cardTitle: String,
          cardText: String,
          cardIcon: String,
        },
      ],
    },
  },
  { versionKey: false },
);

const OurValuesBlock = model('OurValuesBlock', OurValuesBlockSchema);

export default OurValuesBlock;
