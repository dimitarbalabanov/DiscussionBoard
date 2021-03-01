import React from 'react';
import Grid from '@material-ui/core/Grid';
import ForumCard from '../ForumCard/ForumCard3';

const ForumsList = props => {
  const { 
    forums,
    loading
   } = props;

   let output = loading ? [...Array(5)].map((u, i) => {
    let obj = {}
    obj["id"] = i
    return obj
  }) : forums;

  return (
    <React.Fragment>
      {output.map((forum) => (
        <Grid item md={10} key={forum.id}>
          <ForumCard forum={forum} loading={loading}/>
        </Grid>
      ))}
    </React.Fragment>
  );
}

export default ForumsList;