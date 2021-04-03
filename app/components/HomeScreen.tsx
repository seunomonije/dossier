import React from "react";
import {Box, Grid, Button, TextField} from '@material-ui/core';
import {Card} from "./Card"

export function HomeScreen() {
    // const classes = useStyles();
  
    const onSubmit = () => {
      window.location.href = 'https://www.youtube.com/embed/uJqzHkEe0RE';
    };
  
    const [addButton, setAddButton] = React.useState<boolean>(false);
    const [moduleLink, setModuleLink] = React.useState<string>('');

    return (
      <>
        <Button
          onClick={() => {
            setAddButton(!addButton);
          }}
        >
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
            <Button
          onClick={onSubmit}
        >
          Add Module
        </Button>
        </Grid>}

          <Grid
            container
            // onClick = {() => {
            //     window.location.href = 'https://www.youtube.com/embed/uJqzHkEe0RE'
            // }}
          >
            <Card
              title={'HI Nikhil'}
              description={
                'This Privacy Policy applies to Personal Information Processed by us in our business, including on our website This Privacy Policy applies to Personal Information Processed by us in our business, including on our website This Privacy Policy applies to Personal Information Processed by us in our business, including on our website This Privacy Policy applies to Personal Information Processed by us in our business, including on our website This Privacy Policy applies to Personal Information Processed by us in our business, including on our website This Privacy Policy applies to Personal Information Processed by us in our business, including on our website '
              }
              link={`https://www.youtube.com/embed/uJqzHkEe0RE`}
              imageLink={'https://www.mainstreet.com/hubfs/John%20Melas.jpg'}
            />
            <Card
              title={'HI Josh'}
              description={'i love the office'}
              link={`https://www.youtube.com/embed/Db1NdYbQhAA`}
              imageLink={'https://www.mainstreet.com/hubfs/John%20Melas.jpg'}

            />
            <Card
              title={'HI Seun'}
              description={'i love dossier'}
              link={`https://www.youtube.com/embed/uJqzHkEe0RE`}
              imageLink={'https://www.mainstreet.com/hubfs/John%20Melas.jpg'}
            />
          </Grid>
        
      </>
    );
  }