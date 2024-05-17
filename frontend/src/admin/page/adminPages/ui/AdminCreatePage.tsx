import React, { useState } from 'react';
import { Box, Button, Grid, List, ListItem, ListItemText, Modal, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { components } from '../../../../app/constants/components';
import { createPage } from '../api/adminCreatePageThunks';
import InputItem from '../../../widgets/adminPageCreateForm/InputItem';
import { Card, CreatePage, Field, IPage } from '../model/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';

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

    const combinedObject: {
      [key: string]: string | File | Card[];
    } = {};
    for (const key in selectComponent.fields) {
      const value = selectComponent.fields[key as keyof typeof selectComponent.fields];
      combinedObject[key] = value.value;
    }

    if (selectComponent.card) {
      combinedObject['cards'] = [];
    }

    setPages((prevState) => [...prevState, { nameComponent: selectComponent.nameModel, content: combinedObject }]);
    setOpenModal(false);
  };

  const onChangeComponents = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const data = [...page];
    data[index].content[name] = value;
    setPages(data);
  };

  const imageInputChangeForBlock = (field: Field, location: string, blockIndex: number) => {
    const data = JSON.parse(JSON.stringify(page));
    const block = components.find((comp) => comp.nameModel === data[blockIndex].nameComponent);

    if (block) {
      const fieldKey = Object.keys(block.fields).find((key) => block.fields[key].fieldName === field.fieldName);

      if (fieldKey && block.fields[fieldKey].typeField === 'image') {
        data[blockIndex].content[fieldKey] = location;
      }
    }

    setPages(data);
  };

  const imageInputChangeForCard = (field: Field, location: string, blockIndex: number, cardIndex: number) => {
    const data = JSON.parse(JSON.stringify(page));
    const block = components.find((comp) => comp.nameModel === data[blockIndex].nameComponent);

    if (block) {
      const card = (data[blockIndex].content.cards as Card[])[cardIndex];
      const cardFieldKey = Object.keys(block.card?.fields || {}).find(
        (key) => block.card?.fields[key].fieldName === field.fieldName,
      );

      if (card && cardFieldKey && block.card?.fields[cardFieldKey].typeField === 'image') {
        card[cardFieldKey] = location;
      }

      setPages(data);
    }
  };

  const addCard = (index: number) => {
    const data = [...page];
    const component = components.find((comp) => comp.nameModel === data[index].nameComponent);

    if (!component?.card?.fields) {
      console.error('No card fields found for the component:', data[index].nameComponent);
      return;
    }

    const newCard = Object.entries(component.card.fields).reduce((acc, [key, cardField]) => {
      acc[key] = cardField.value;
      return acc;
    }, {} as Card);

    if (!data[index].content.cards) {
      data[index].content.cards = [];
    }

    (data[index].content.cards as Card[]).push(newCard);
    setPages(data);
  };

  const onChangeCardContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    blockIndex: number,
    cardIndex?: number,
  ) => {
    const { name, value } = e.target;
    const data = [...page];
    if (cardIndex !== undefined) {
      (data[blockIndex].content.cards as Card[])[cardIndex][name] = value;
    } else {
      data[blockIndex].content[name] = value;
    }
    setPages(data);
  };

  const areAllRequiredFieldsFilled = (
    fields: Fields,
    content: {
      [key: string]: string | File | Card[];
    },
  ) => {
    for (const key in fields) {
      const field = fields[key];
      if (field.required && !content[key]) {
        return false;
      }
    }
    return true;
  };

  const areAllCardFieldsFilled = (cards: Card[]) => {
    for (const card of cards) {
      for (const key in card) {
        if (!card[key]) {
          return false;
        }
      }
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result: CreatePage = { name, url, blocks: page };
    dispatch(createPage(result));
    navigate('/admin/pages');
  };

  const handleDeleteComponent = (index: number) => {
    const updatedBlocks = blocks.filter((_, blockIndex) => blockIndex !== index);
    const updatedPages = page.filter((_, pageIndex) => pageIndex !== index);
    const updatedComponentNames = chooseComponentName.filter((_, nameIndex) => nameIndex !== index);
    setBlocks(updatedBlocks);
    setPages(updatedPages);
    setChooseComponentName(updatedComponentNames);
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
            Add Component
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
                  <Button variant="contained" color={'error'} onClick={() => handleDeleteComponent(index)}>
                    Delete
                  </Button>
                </Box>
                {Object.keys(block).map((key: keyof Fields) => {
                  const input = block[key];
                  const value = page[index].content[key] as string;
                  return (
                    <Grid item sx={{ mb: 1 }} key={`${index}-${key}`}>
                      <InputItem
                        field={input}
                        index={index}
                        value={value}
                        onChange={onChangeComponents}
                        imageInputChangeForBlock={imageInputChangeForBlock}
                      />
                    </Grid>
                  );
                })}
                {page[index].content.cards && (
                  <>
                    {areAllRequiredFieldsFilled(block, page[index].content) && (
                      <Button
                        variant="contained"
                        onClick={() => addCard(index)}
                        disabled={!areAllCardFieldsFilled(page[index].content.cards as Card[])}
                      >
                        Add Card
                      </Button>
                    )}
                    {(page[index].content.cards as Card[]).map((card, cardIndex) => (
                      <Box
                        key={cardIndex}
                        sx={{ border: '1px solid gray', borderRadius: '10px', padding: 1, marginBottom: 1 }}
                      >
                        {Object.keys(card).map((key) => {
                          const cardField = components.find((comp) => comp.nameModel === page[index].nameComponent)
                            ?.card?.fields[key];
                          return cardField ? (
                            <Grid item sx={{ mb: 1 }} key={`${index}-${cardIndex}-${key}`}>
                              <InputItem
                                field={cardField}
                                index={index}
                                cardIndex={cardIndex}
                                value={card[key] as string}
                                onChange={onChangeCardContent}
                                imageInputChangeForCard={imageInputChangeForCard}
                              />
                            </Grid>
                          ) : null;
                        })}
                      </Box>
                    ))}
                  </>
                )}
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
          <List>
            {components.map((component, index) => (
              <ListItem key={component.id} onClick={() => onSelectComponent(index)}>
                <ListItemText primary={component.displayName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};
