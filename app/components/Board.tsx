import React from "react";
import {Grid, TextField} from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import {GenerateCard} from './GenerateCard';
import 'holderjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const CONTENT_WIDTH = '80%';
const CONTENT_MARGINS = '5vh';

const content = {
  width: '70%',
  margin: '5vh 8vh',
}

export function Board() {
    // const classes = useStyles();

    const onSubmit = () => {
      window.location.href = 'https://www.youtube.com/embed/uJqzHkEe0RE';
    };
  
    const [addButton, setAddButton] = React.useState<boolean>(false);
    const [moduleLink, setModuleLink] = React.useState<string>('');

    // This random data will be changes with data retrieved from server.
    const randomPhrases = [
      "This is a random title",
      "This is alright",
      "I'm still going",
      "We have to randomize the size",
      "random size = more present"
    ]

    const randomTextContent = [
      "On the other hand, the following is a valid comment, pulled directly from a working application.",
      "My name is Seun and i like to code",
      "This QCHack hackathon is alot of work, its getting annoying because Yale is doing all the work, but it's still fun nonetheless",
    ]

    const picOrNah = [
      "https://picsum.photos/400",
      "https://picsum.photos/400/200",
      "https://picsum.photos/300",
      null
    ]

    let cards = [];
    for (let i = 0; i < 8; i++) {
      let random = Math.floor(Math.random() * randomPhrases.length);
      let random1 = Math.floor(Math.random() * randomTextContent.length);
      let random2 = Math.floor(Math.random() * picOrNah.length);
      cards.push(GenerateCard(randomPhrases[random], randomTextContent[random1], picOrNah[random2], "seunomonije"))
    }

    return (
      <>
        {/* Josh's stuff */} 
        <Button onClick={() => {setAddButton(!addButton);}}>
          Add Module to your Board
        </Button>

        {addButton && <Grid container justify = 'center'>
            <TextField
            variant = 'outlined'
            placeholder = 'Link to Module'
            label = 'Link to Module'
            value = {moduleLink}
            onChange = {(event)=>{
                setModuleLink(event.target.value)
            }}
            />
            <Button onClick={onSubmit}>
          Add Module
        </Button>      
        </Grid>}

        {/* Cards */} 
        <div style={content}>
        <CardColumns>{cards}</CardColumns>
        </div>
        
      </>
    );
  }
