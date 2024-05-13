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
  navbarItems: {
    fields: {
      nameNav: {
        type: string;
        fieldName: string;
        value: string;
        typeField: string;
        required: boolean;
        placeholder: string;
      };
      link: {
        type: string;
        fieldName: string;
        value: string;
        typeField: string;
        required: boolean;
        placeholder: string;
      };
    };
  }[];
}
