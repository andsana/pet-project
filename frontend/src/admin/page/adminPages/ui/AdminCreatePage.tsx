import React, { useState } from 'react';
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Modal, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { components } from '../../../../app/constants/components';
import { createPage } from '../api/adminCreatePageThunks';
import InputItem from '../../../widgets/adminPageCreateForm/InputItem';
import { Field, IPage } from '../model/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks.ts';

interface Fields {
  [key: string]: Field;
}

export const AdminCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [blocks, setBlocks] = useState<Fields[]>([]);
  const [page, setPages] = useState<IPage[]>([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [chooseComponentName, setChooseComponentName] = useState<string[]>([]);

  const onSelectComponent = (index: number) => {
    const selectComponent = components[index];
    setChooseComponentName((prevState) => [...prevState, selectComponent.displayName]);
    setBlocks((prevState) => [...prevState, selectComponent.fields]);
    const oneFieldObject = [];

    for (const key in selectComponent.fields) {
      const value = selectComponent.fields[key as keyof typeof selectComponent.fields];
      const item = { [key]: value.value };
      oneFieldObject.push(item);
    }

    const combinedObject = Object.assign({}, ...oneFieldObject);
    setPages((prevState) => [...prevState, { nameComponent: selectComponent.name, content: combinedObject }]);
    setOpenModal(false);
  };

  const onChangeComponents = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const data = [...page];
    data[index].content[name] = value;
    setPages(data);
  };

  const imageInputChange = (location: string, index: number) => {
    const data = [...page];
    data[index].content['image'] = location;
    setPages(data);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = { name, url, blocks: page };
    dispatch(createPage(result));
    navigate('/admin/pages');
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
        <TextField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} variant="outlined" />
        {name && url && (
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            sx={{ backgroundColor: '#000', color: '#fff', borderColor: '#000', width: '50%', alignSelf: 'center' }}
          >
            Добавить компонент
          </Button>
        )}
      </Box>
      <Box component={'form'} sx={{ mt: 2 }} onSubmit={onSubmit}>
        <Grid container spacing={2} direction="column">
          {blocks.map((block, index) => (
            <React.Fragment key={index}>
              <Box sx={{ border: '1px solid black', borderRadius: '14px', padding: 1, margin: '10px 0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
                  <Typography variant="h6">{chooseComponentName[index]}</Typography>
                  <Button variant="contained" color={'error'}>
                    Delete
                  </Button>
                </Box>
                {Object.keys(block).map((key: keyof Fields) => {
                  const input = block[key];
                  const value = page[index].content[key];
                  return (
                    <Grid item sx={{ mb: 1 }} key={`${index}-${key}`}>
                      <InputItem
                        field={input}
                        index={index}
                        value={value}
                        onChange={onChangeComponents}
                        imageInputChange={imageInputChange}
                      />
                    </Grid>
                  );
                })}
              </Box>
            </React.Fragment>
          ))}
        </Grid>
        <Grid item>
          <Button variant={'contained'} type={'submit'} sx={{ margin: '10px 0' }}>
            Save
          </Button>
        </Grid>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#fff',
            border: '2px solid #000',
            p: 2,
          }}
        >
          <Tooltip title="Search">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <InputBase placeholder="Search..." sx={{ border: '1px solid #000', borderRadius: '4px', px: 1 }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Select a Component
          </Typography>
          <Divider />
          <List>
            {components.map((component, index) => (
              <ListItem
                key={component.id}
                onClick={() => {
                  onSelectComponent(index);
                }}
              >
                <ListItemText primary={component.displayName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};
