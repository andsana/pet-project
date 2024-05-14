import { model, Schema } from 'mongoose';

const AboutAsBlockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { versionKey: false },
);

const AboutAsBlock = model('AboutAsBlock', AboutAsBlockSchema);

export default AboutAsBlock;
