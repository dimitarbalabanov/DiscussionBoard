import React from 'react';
import Grid from '@material-ui/core/Grid';
import ForumCard from '../ForumCard/ForumCard3';
import Spinner from '../../Spinner/AnotherSpinner';
const ForumsList = props => {
  const { 
    forums,
    loading
   } = props;


  return (
    loading 
    ? <Spinner></Spinner>
    :
    <React.Fragment>
      {forums.map((forum) => (
        <Grid item md={10} key={forum.id}>
          <ForumCard forum={forum}/>
        </Grid>
      ))}
    </React.Fragment>
  );
}

export default ForumsList;