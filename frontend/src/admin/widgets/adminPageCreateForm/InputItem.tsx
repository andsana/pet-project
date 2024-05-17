import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { Field } from '../../page/adminPages/model/types';
import ImageUpload from '../../shared/imageUpload/imageUpload';

interface Input {
  field: Field;
  index: number;
  value: string | File;
  cardIndex?: number;
  imageLocation: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, cardIndex?: number) => void;
  imageInputChangeForBlock?: (field: Field, location: string, index: number) => void;
  imageInputChangeForCard?: (field: Field, location: string, index: number, cardIndex: number) => void;
}

const InputItem: React.FC<Input> = ({
  field,
  onChange,
  index,
  value,
  cardIndex,
  imageLocation,
  imageInputChangeForBlock,
  imageInputChangeForCard,
}) => {
  useEffect(() => {
    if (field.typeField === 'image') {
      if (cardIndex !== undefined && imageInputChangeForCard) {
        imageInputChangeForCard(field, imageLocation, index, cardIndex);
      } else if (imageInputChangeForBlock) {
        imageInputChangeForBlock(field, imageLocation, index);
      }
    }
  }, [imageLocation]);

  const onComponentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e, index, cardIndex);
  };

  switch (field.typeField) {
    case 'short-text':
      return (
        <TextField
          label={field.placeholder}
          name={field.fieldName}
          required={field.required}
          value={value as string}
          onChange={onComponentChange}
          fullWidth
        />
      );
    case 'long-text':
      return (
        <TextField
          label={field.placeholder}
          name={field.fieldName}
          value={value as string}
          required={field.required}
          onChange={onComponentChange}
          multiline
          rows={4}
          fullWidth
        />
      );
    case 'image':
      return (
        <ImageUpload
          name={field.fieldName}
          onImageUpload={(location: string) => {
            if (cardIndex !== undefined && imageInputChangeForCard) {
              imageInputChangeForCard(field, location, index, cardIndex);
            } else if (imageInputChangeForBlock) {
              imageInputChangeForBlock(field, location, index);
            }
          }}
        />
      );
    default:
      console.error(`Invalid field type: ${field.typeField}`);
      return null;
  }
};

export default InputItem;
