import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from '../PostCard/PostCard';

const PostsList = props => {
  const {
    posts,
    loading,
    allIds
    //error
   } = props;

   function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  console.log(posts);
  console.log(allIds);

  return (
    <React.Fragment>
        {
          allIds !== undefined &&
        // posts !== undefined && !isEmpty(posts) && allIds.lenght > 0 ?
          allIds.map((id) => (
            <Grid item xs={12} md={10} key={id}>
              <PostCard post={posts[id]} loading={loading} />
            </Grid>
          )) 
          // : console.log(posts)
        }
    </React.Fragment>
  );
}

export default React.memo(PostsList);