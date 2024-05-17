import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectImageLocation } from '../../page/adminPages/model/imageUploadSlice';
import { Field } from '../../page/adminPages/model/types';
import ImageUpload from '../../shared/imageUpload/imageUpload';

interface Input {
  field: Field;
  index: number;
  value: string | File;
  cardIndex?: number;
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
  imageInputChangeForBlock,
  imageInputChangeForCard,
}) => {
  const imageLocation = useAppSelector(selectImageLocation);

  useEffect(() => {
    if (imageInputChangeForCard && field.typeField === 'image' && cardIndex !== undefined) {
      imageInputChangeForCard(field, imageLocation, index, cardIndex);
    } else if (field.typeField === 'image' && imageInputChangeForBlock && cardIndex === undefined) {
      imageInputChangeForBlock(field, imageLocation, index);
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
      return <ImageUpload name={field.fieldName} />;
    default:
      console.error(`Invalid field type: ${field.typeField}`);
      return null;
  }
};

export default InputItem;
