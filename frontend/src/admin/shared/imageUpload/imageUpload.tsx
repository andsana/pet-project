import React, { useState, useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { fileUpload } from '../../page/adminPages/api/imageUploadThunks';
import { useAppDispatch } from '../../../store/hooks';

interface Props {
  name: string;
  onImageUpload: (location: string) => void;
}

const ImageUpload: React.FC<Props> = ({ name, onImageUpload }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilename(file.name);

      // Загружаем файл и вызываем onImageUpload с URL изображения
      try {
        const result = await dispatch(fileUpload(file)).unwrap();
        onImageUpload(result); // Передача URL загруженного изображения
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setFilename('');
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={name} onChange={onFileChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField disabled label={'Image'} value={filename} onClick={activateInput} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUpload;
