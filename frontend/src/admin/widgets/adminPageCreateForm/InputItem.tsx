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
  imageInputChange: (location: string, index: number, cardIndex?: number) => void;
}

const InputItem: React.FC<Input> = ({ field, onChange, index, value, cardIndex, imageInputChange }) => {
  const imageLocation = useAppSelector(selectImageLocation);

  useEffect(() => {
    imageInputChange(imageLocation, index, cardIndex);
  }, [imageLocation, imageInputChange, index, cardIndex]);

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
          value={value}
          onChange={onComponentChange}
          fullWidth
        />
      );
    case 'long-text':
      return (
        <TextField
          label={field.placeholder}
          name={field.fieldName}
          value={value}
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
