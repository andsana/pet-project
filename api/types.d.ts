import { Model } from 'mongoose';

export interface Page {
  name: string;
  url: string;
  blocks: Block[];
}

export interface Block {
  nameComponent: string;
  content: { [key: string]: string };
}

export interface ModelType {
  [key: string]: any;
}

export interface NavbarItemFields {
  nameNav: string;
  link: string;
  isDrop: boolean;
  nestedMenu: [
    {
      nestedNameNav: string;
      nestedLink: string;
    },
  ];
}

export interface AboutAsBlockMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface OurValuesBlockMutation {
  title: string;
  cards: OurValuesBlockCard[];
}

interface OurValuesBlockCard {
  cardTitle: string;
  cardText: string;
  cardIcon: string | null;
}

//User
export interface UserMutation {
  email: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  image: string | null;
  googleID?: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
