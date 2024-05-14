export interface ComponentField {
  type: string;
  fieldName: string;
  value: string | File;
  typeField: string;
  required: boolean;
  placeholder: string;
}

export interface CardField {
  [key: string]: ComponentField;
}

export interface Component {
  id: string;
  image: string;
  name: string;
  displayName: string;
  fields: { [key: string]: ComponentField };
  card?: { fields: CardField };
}

export interface Field {
  type: string;
  fieldName: string;
  value: string | File;
  typeField: string;
  required: boolean;
  placeholder: string;
}

export interface Card {
  [key: string]: string | File;
}

export interface IPage {
  nameComponent: string;
  content: { [key: string]: string | File | Card[] };
}

export interface CreatePage {
  name: string;
  url: string;
  blocks: IPage[];
}

export interface OnePageResponse {
  _id: string;
  name: string;
  components: [{ [key: string]: string }];
  componentType: string[];
}
