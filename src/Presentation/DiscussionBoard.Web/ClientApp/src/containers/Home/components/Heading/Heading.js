import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    //color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  mainFeaturedPostContent: {
    padding: theme.spacing(6),
    justifyContent: 'center'
  },
}));

const Heading = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container className={classes.mainFeaturedPostContent}>
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          DISCUSSION BOARD
        </Typography>
      </Grid>
    </Paper>
  );
}

export default Heading;