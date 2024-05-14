import { Component } from '../../../types';

export const components: Component[] = [
  {
    id: '1',
    image: '',
    nameModel: 'AboutAsBlock',
    displayName: 'About as block',
    fields: {
      title: {
        type: 'string',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put title',
      },
      description: {
        type: 'string',
        fieldName: 'description',
        value: '',
        typeField: 'long-text',
        required: true,
        placeholder: 'Put description',
      },
      image: {
        type: 'string',
        fieldName: 'image',
        value: '',
        typeField: 'image',
        required: true,
        placeholder: 'Put image',
      },
    },
  },
  {
    id: '2',
    image: '',
    nameModel: 'OurValuesBlock',
    displayName: 'Our values block',
    fields: {
      title: {
        type: 'string',
        fieldName: 'title',
        value: '',
        typeField: 'short-text',
        required: true,
        placeholder: 'Put title',
      },
    },
    card: {
      fields: {
        cardTitle: {
          type: 'string',
          fieldName: 'cardTitle',
          value: '',
          typeField: 'short-text',
          required: true,
          placeholder: 'Put title',
        },
        cardDescription: {
          type: 'string',
          fieldName: 'cardDescription',
          value: '',
          typeField: 'long-text',
          required: true,
          placeholder: 'Put description',
        },
        cardIcon: {
          type: 'string',
          fieldName: 'cardIcon',
          value: '',
          typeField: 'image',
          required: true,
          placeholder: 'Put icon',
        },
      },
    },
  },
];
