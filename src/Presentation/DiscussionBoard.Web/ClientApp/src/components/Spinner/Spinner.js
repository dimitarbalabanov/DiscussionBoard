import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
  return (
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      //justify="center"
      style={{ minHeight: '100vh', marginTop: "50px" }}
    >
      <CircularProgress size={150}/>
    </Grid>
  );
};

export default Spinner;