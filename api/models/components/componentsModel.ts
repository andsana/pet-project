import { Document, model, Schema } from 'mongoose';

interface ComponentField {
  fieldName: string;
  value: string;
  typeField: string;
  required: boolean;
  placeholder: string;
}

interface Component {
  nameModel: string;
  displayName: string;
  image: string;
  fields: { [key: string]: ComponentField };
  cards?: { [key: string]: ComponentField }[];
}

const componentFieldSchema = new Schema<ComponentField>({
  fieldName: { type: String, required: true },
  value: { type: String, default: '' },
  typeField: { type: String, required: true },
  required: { type: Boolean, required: true },
  placeholder: { type: String, required: true },
});

const componentsSchema = new Schema({
  nameModel: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'Some url to image',
  },
  fields: { type: Map, of: componentFieldSchema },
  cards: { type: [Map], of: componentFieldSchema },
});

const ComponentModel = model<Component & Document>('ComponentModel', componentsSchema);
export default ComponentModel;
