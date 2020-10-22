import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts
} from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from '../../components/Page/Page';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';
//import ForumCard2 from '../../components/Forum/ForumCard/ForumCard2';
import PostsList from '../../components/Post/PostsList/PostsList';
import PostCardSkeleton from '../../components/Post/PostCard/PostCardSkeleton';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import Spinner from '../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));
const divStyle = {
  color: 'blue',
  height: '250px',
  textAlign: 'center',
  padding: '5px 10px',
  background: '#eee',
  marginTop: '15px'
};
const Home = props => {
  const classes = useStyles();

  const { 
    forums,
    forumsLoading,
    //forumsError,
    posts,
    postsLoading,
    postsError,
    onFetchForums,
    onFetchPosts,
    isAuthenticated
  } = props;
  
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPage((page) => page + 1)
    }
  };
  
  useEffect(() => {
    onFetchForums();
  }, [onFetchForums])

  useEffect(() => {
    onFetchPosts(page);
  }, [onFetchPosts, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, []);


  return (
    <Page title="Discussion Board">
    <Grid 
      container
      spacing={10}
      direction="row"
      alignItems="flex-start"
    > 
      <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
        <CreatePostButton isAuthenticated={isAuthenticated}/>
        <PostsList posts={posts} loading={postsLoading} error={postsError}/>
        {posts.length < 1 &&
        <React.Fragment>

          <Grid item xs={12} md={10} justify="center">
            <PostCardSkeleton />
          </Grid>

          <Grid item xs={12} md={10} justify="center">
            <Box component={Paper}>
            <PostCardSkeleton />
            </Box>
          </Grid>

          <Grid item xs={12} md={10} justify="center">
            <Box component={Paper}>
            <PostCardSkeleton />
            </Box>
          </Grid>

          <Grid item xs={12} md={10} justify="center">
            <Box component={Paper}>
            <PostCardSkeleton />
            </Box>
          </Grid>

        </React.Fragment>
        }
        <Grid item xs={12} md={10} justify="center">
            <Box component={Paper}>
              <Spinner/>
            </Box>
          </Grid>
      </Grid>
      <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
        <ForumsList forums={forums} loading={forumsLoading}/>
        {/* <ForumCard2 forums={forums} loading={forumsLoading} /> */}
      </Grid>
    </Grid>
      {postsError ? null : <div ref={loader}></div>}
  </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.forums.forums,
    forumsLoading: state.forums.loading,
    forumsError: state.forums.error,
    posts: state.posts.posts,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onFetchPosts: (pageNumber) => dispatch(fetchPosts(null, pageNumber))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);