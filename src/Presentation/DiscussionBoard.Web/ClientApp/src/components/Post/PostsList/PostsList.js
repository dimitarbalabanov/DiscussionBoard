import React from 'react';
import Grid from '@material-ui/core/Grid';
// import PostCard from '../PostCard/PostCard';
import AnotherPostCard from '../PostCard/AnotherPostCard';

const PostsList = props => {
  const {
    posts,
    loading,
    //error
   } = props;

  return (
    <React.Fragment>
        {posts && posts.map((post) => (
          <Grid item xs={12} md={10} key={post.id}>
             <AnotherPostCard post={post} loading={loading} />
          </Grid>
        ))}
    </React.Fragment>
  );
}

export default React.memo(PostsList);