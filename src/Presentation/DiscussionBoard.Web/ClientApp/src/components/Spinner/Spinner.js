import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Grid container
      className={classes.padding}
      spacing={0}
      direction="column"
      alignItems="center"
      //justify="center"
      //style={{ paddingBottom: "50px", paddingTop: "50px" }}
    >
      <CircularProgress size={100}/>
    </Grid>
  );
};

export default Spinner;