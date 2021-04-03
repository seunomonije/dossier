import React from "react";
import {Box, Grid, Typography, Link, CardMedia} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Text} from "react-native"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    borderEdge: {
        backgroundColor: '#ffefd3',
        borderRadius: 50,
        borderColor:'#OOOOOO',
        borderWidth:'5px',
        // height: '200px',
        padding:'24px',
        margin: '24px'
    },
    blueText:{
        color:'#001B2E',
    },
    media: {
        height: 0,
        paddingTop: '100%'//.//25%', // 16:9
      },
  }));

interface CardProps {
    title: string,
    description:string,
    link:string,
    imageLink: string,
}
export function Card({
    title,
    description,
    link,
    imageLink
}:CardProps) {
    const classes = useStyles();

    return (
        <Grid container spacing = {3} className = {classes.borderEdge} alignContent = 'space-between' justify = 'space-between'>
            <Grid item xs = {12}>   
                <Typography variant='h5' className = {classes.blueText}>
                    {title}
                </Typography> 
            </Grid>
            <Grid item xs = {10}>
                <Typography variant='body2' className = {classes.blueText}>
                    {description}
                </Typography> 
                <Typography variant='body2' className = {classes.blueText}>
                    <Link href= {link} onClick = {() =>{
                        window.location.href = link
                    }}>
                    Read More...
                    </Link>
                </Typography> 
            </Grid>
            <Grid item xs = {2}>
                {/* <iframe
                    src={link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                /> */}
                <CardMedia
                className = {classes.media}
                image = {imageLink}/>

                {/* <img
                height = '200px'
                //width='200px' 
      src="https://www.mainstreet.com/hubfs/John%20Melas.jpg"
      alt="new"
      /> */}
            </Grid>
        </Grid>
    );
}