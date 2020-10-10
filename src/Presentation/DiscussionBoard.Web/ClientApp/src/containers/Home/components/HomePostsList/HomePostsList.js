import React from 'react';
import Grid from '@material-ui/core/Grid';
import HomePostCard from './HomePostCard/HomePostCard';
const HomePostsList = props => {
  const {
    posts,
    loading,
    //error
   } = props;

  let output = loading ? [...Array(5)].map((u, i) => {
    let obj = {}
    obj["id"] = i
    return obj
  }) : posts;

  return (
      <Grid item xs={12} md={8}>
        <Grid container spacing={2} justify="flex-end">
          {output.map((post) => (
            <Grid item xs={8} md={10} key={post.id}>
              <HomePostCard post={post} loading={loading} />
            </Grid>
          ))}
        </Grid>
      </Grid>
  );
}

export default HomePostsList;