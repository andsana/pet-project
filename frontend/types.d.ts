export interface ComponentField {
  type: string;
  fieldName: string;
  value: string | File;
  typeField: string;
  required: boolean;
  placeholder: string;
}

export interface Component {
  id: string;
  image: string;
  nameModel: string;
  displayName: string;
  fields: {
    [key: string]: ComponentField;
  };
  card?: {
    fields: {
      [key: string]: ComponentField;
    };
  };
}
