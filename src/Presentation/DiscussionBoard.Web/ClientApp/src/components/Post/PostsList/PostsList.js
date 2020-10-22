import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PostCard from '../PostCard/PostCard';
import Spinner from '../../Spinner/Spinner';

const PostsList = props => {
  const {
    posts,
    loading,
    //error
   } = props;

  // let output = loading ? (posts || []).concat([...Array(5)].map((u, i) => {
  //   let obj = {}
  //   obj["id"] = i
  //   return obj
  // })) : posts;

  return (
    <React.Fragment>
          {/* <Grid item xs={12} md={10}>

            <Box component={Paper}>
              <Spinner/>
            </Box>
          </Grid> */}
        {posts && posts.map((post) => (
          <Grid item xs={12} md={10} key={post.id}>
             <PostCard post={post} loading={loading} />
          </Grid>
        ))}
    </React.Fragment>
  );
}

export default PostsList;