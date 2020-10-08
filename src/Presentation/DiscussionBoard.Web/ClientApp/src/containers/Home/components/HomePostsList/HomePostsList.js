import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import HomePostCard from './HomePostCard/HomePostCard';
import Create from '../../Create';

const HomePostsList = props => {
  const {
    posts,
    loading
   } = props;

  //  console.log("--------------------------------------------------------")
  //  console.log(props)
  //  useEffect(() => {
  //  console.log("--------------------------------------------------------")
 
  //    console.log(props)
  //  })

   const emptyPost = {
    id: 0,
    title: "title",
    forumTitle: "title",
    commentsCount: "10",
  }

  return (
      <Grid item xs={12} md={8}>
        <Grid container spacing={2} justify="flex-end">
          <Create />
          {loading ? Array(10).fill(emptyPost).map((post,i) => (
            <Grid item xs={8} md={10}>
              <HomePostCard key={i} post={post} loading={loading} />
            </Grid>
          )) : posts.map((post) => (
            <Grid item xs={8} md={10}>
              <HomePostCard key={post.id} post={post} loading={loading} />
            </Grid>
          ))}
        </Grid>
      </Grid>
  );
}

export default HomePostsList;