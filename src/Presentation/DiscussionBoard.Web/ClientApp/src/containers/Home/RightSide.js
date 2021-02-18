import React from 'react';
import Grid from '@material-ui/core/Grid';
import ForumsList from '../../components/Forum/ForumsList/ForumsList2';

const RightSide = props => {
  const { 
    forums,
    forumsLoading,
  } = props;

  return (
    <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
      <ForumsList forums={forums} loading={forumsLoading}/>
    </Grid>
  );
}

export default RightSide;