import { ModelType } from '../types';
import Header from '../models/header/Header';
import OurValuesBlock from '../models/ourValuesBlock/OurValuesBlock';
import AboutAsBlock from '../models/aboutAsBlock/AboutAsBlock';

export const modelMapping: ModelType = {
  header: Header,
  ourValuesBlock: OurValuesBlock,
  AboutAsBlock: AboutAsBlock,
};
