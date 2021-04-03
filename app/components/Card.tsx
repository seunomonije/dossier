import React from "react";
import Box from '@material-ui/core/Box';

export function Card() {
    // const classes = useStyles();

    return (
        <Box >
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/rokGy0huYEA`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </Box>
    );
}