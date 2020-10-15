import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from '../PostCard/PostCard';

const PostsList = props => {
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
    <React.Fragment>
        {output.map((post) => (
          <Grid item xs={12} md={10} key={post.id}>
            <PostCard post={post} loading={loading} />
          </Grid>
        ))}
    </React.Fragment>
  );
}

export default PostsList;