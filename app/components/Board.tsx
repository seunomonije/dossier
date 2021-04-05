import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { GenerateCard } from './GenerateCard';
import 'holderjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../hooks/use-auth';
import AppBar from './AppBar';

const CONTENT_WIDTH = '80%';
const CONTENT_MARGINS = '5vh';

const content = {
  width: '70%',
  margin: '5vh 8vh',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: '#4299E1',
    },
    newInput: {
      marginTop: theme.spacing(2),
    },
    inputComponent: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
      backgroundColor: '#4299E1',
    },
    textComponent: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    title: {
      color: '#4A5568',
      fontSize: 24,
      marginTop: theme.spacing(2),
    },
  })
);

export function Board() {
  const classes = useStyles();

  const { currentUser, logout } = useAuth();
  const [dataList, setDataList] = useState<any>([]);
  const username = currentUser
    ? currentUser.displayName.trim().toLowerCase()
    : '';
  const onSubmit = async () => {
    const token = await currentUser.getIdToken();
    const res: any = await fetch('http://localhost:5000/content', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({
        url: moduleLink,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    let newList = [...dataList];
    newList.push(res);
    setDataList(newList);
  };

  const [addButton, setAddButton] = React.useState<boolean>(false);
  const [moduleLink, setModuleLink] = React.useState<string>('');

  // This random data will be changes with data retrieved from server.
  const randomPhrases = [
    'This is a random title',
    'This is alright',
    "I'm still going",
    'We have to randomize the size',
    'random size = more present',
  ];

  const randomTextContent = [
    'On the other hand, the following is a valid comment, pulled directly from a working application.',
    'My name is Seun and i like to code',
    "This QCHack hackathon is alot of work, its getting annoying because Yale is doing all the work, but it's still fun nonetheless",
  ];

  const picOrNah = [
    'https://picsum.photos/400',
    'https://picsum.photos/400/200',
    'https://picsum.photos/300',
    null,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = await currentUser.getIdToken();
      const res: any = await fetch('http://localhost:5000/content', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
        method: 'GET',
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setDataList(res.content);
    };

    fetchData();
  }, []);

  return (
    <>
      {dataList && (
        <>
          <AppBar></AppBar>
          <Typography variant='caption' className={classes.title}>
            Welcome {currentUser.displayName}
          </Typography>

          <Button
            onClick={() => {
              setAddButton(!addButton);
            }}
            className={classes.button}
          >
            Add Module to your Board
          </Button>

          {addButton && (
            <Grid container justify='center' className={classes.newInput}>
              <TextField
                variant='outlined'
                placeholder='Link to Module'
                label='Link to Module'
                value={moduleLink}
                className={classes.textComponent}
                onChange={(event) => {
                  setModuleLink(event.target.value);
                }}
              />
              <Button onClick={onSubmit} className={classes.inputComponent}>
                Add Module
              </Button>
            </Grid>
          )}

          {/* Cards */}
          <div style={content}>
            <CardColumns>
              {dataList.map((piece: any) => {
                console.log(piece);
                return GenerateCard(
                  piece.title,
                  piece.text,
                  piece.image,
                  username
                );
              })}
            </CardColumns>
          </div>
        </>
      )}
    </>
  );
}
