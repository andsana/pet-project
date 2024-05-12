import { Components } from '../../../types';

export const components: Components[] = [
  {
    id: '1',
    image: '',
    name: 'Header',
    displayName: 'Заголовок',
    fields: {
      logo: {
        type: 'string',
        fieldName: 'logo',
        value: '',
        typeField: 'image',
        required: true,
        placeholder: 'Put logo',
      },
      name: {
        type: 'string',
        fieldName: 'name',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put name',
      },
      url: {
        type: 'string',
        fieldName: 'url',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put url',
      },
      navbarItems: {
        type: 'array',
        fieldName: 'navbarItems',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Select navbar items',
      },
    },
  },
];
