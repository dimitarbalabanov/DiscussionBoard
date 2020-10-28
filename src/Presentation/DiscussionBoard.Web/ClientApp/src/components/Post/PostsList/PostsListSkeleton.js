import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import PostCardSkeleton from '../PostCard/PostCardSkeleton';

const PostsListSkeleton = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={10}>
        <PostCardSkeleton />
      </Grid>
      <Grid item xs={12} md={10}>
        <Box component={Paper}>
        <PostCardSkeleton />
        </Box>
      </Grid>
      <Grid item xs={12} md={10}>
        <Box component={Paper}>
        <PostCardSkeleton />
        </Box>
      </Grid>
      <Grid item xs={12} md={10}>
        <Box component={Paper}>
        <PostCardSkeleton />
        </Box>
      </Grid>
    </React.Fragment>
  );
}
export default PostsListSkeleton;