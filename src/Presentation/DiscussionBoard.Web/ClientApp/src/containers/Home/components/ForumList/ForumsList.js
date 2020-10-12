import React from 'react';
import Grid from '@material-ui/core/Grid';
import ForumCard from './ForumCard/ForumCard';
import SelectedForumCard from '../../../Forum/components/SelectedForumCard/SelectedForumCard';
import ForumTitleCard from '../../../Forum/components/ForumTitleCard/ForumTitleCard';

const ForumsList = props => {
  const { 
    forums,
    loading
   } = props;

  //  console.log("start forum list")
  //  console.log(props)
  //  console.log("end forum list")
   let output = loading ? [...Array(5)].map((u, i) => {
    let obj = {}
    obj["id"] = i
    return obj
  }) : forums;

  return (
    <Grid item xs={12} md={4}>
      <Grid container spacing={1} justify="center">
        <SelectedForumCard />
        <ForumTitleCard />
        {/* {loading ? Array(10).fill(emptyForum).map((forum,i) => (
            <ForumCard key={i} forum={forum} loading={loading}/>
          )) : forums.map((forum) => (
            <ForumCard key={forum.id} forum={forum} loading={loading}/>
          ))} */}
          {output.map((forum) => (
            <ForumCard key={forum.id} forum={forum} loading={loading}/>
          ))}
      </Grid>
    </Grid>
  );
}

export default ForumsList;