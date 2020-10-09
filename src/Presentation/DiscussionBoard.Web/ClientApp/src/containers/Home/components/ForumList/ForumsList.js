import React from 'react';
import Grid from '@material-ui/core/Grid';
import ForumCard from './ForumCard/ForumCard';

const emptyForum = {
  id: 0,
  title: "title",
  postsCount: 0,
  commentsCount: 0,
};

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