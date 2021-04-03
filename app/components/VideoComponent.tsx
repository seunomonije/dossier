import React from "react";
//"Hello"

// import makeStyles from "@material-ui/core/styles/makeStyles";



// const useStyles = makeStyles((theme) => ({
//     root: {
//         margin: theme.spacing(2),
//     },
//     title: {
//         marginLeft: theme.spacing(3),
//         fontSize: "medium",
//     },
//     blurb: {
//         fontSize: "medium",
//         marginLeft: theme.spacing(10),
//         marginRight: theme.spacing(10),
//         // marginTop: theme.spacing(2),
//         marginBottom: theme.spacing(2),
//     },
//     row: {
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//     },


// }));



function VideoComponent() {
    // const classes = useStyles();
    
    return (
        <div >
          <iframe
		      width="853"
		      height="480"
		      src={`https://www.youtube.com/embed/rokGy0huYEA`}
		      frameBorder="0"
		      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		      allowFullScreen
		      title="Embedded youtube"
		  />
        </div>
    );
}

export default VideoComponent;
