export interface Components {
  id: string;
  image: string;
  name: string;
  displayName: string;
  fields: {
    [key: string]: {
      type: string;
      fieldName: string;
      value: string | File;
      typeField: string;
      required: boolean;
      placeholder: string;
    };
  };
}
