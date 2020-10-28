import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts,
  clearPosts
} from '../../store/actions';
import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Page from '../../components/Page/Page';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';
import PostsList from '../../components/Post/PostsList/PostsList';
import PostsListSkeleton from '../../components/Post/PostsList/PostsListSkeleton';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import Spinner from '../../components/Spinner/Spinner';

const Home = props => {
  const { 
    forums,
    forumsLoading,
    //forumsError,
    posts,
    postsCursor,
    postsHasNextPage,
    postsLoading,
    postsError,
    onFetchForums,
    onFetchPosts,
    isAuthenticated,
    onClearPosts
  } = props;

  const infiniteRef = useInfiniteScroll({
    postsLoading,
    postsHasNextPage,
    onLoadMore: () => onFetchPosts(postsCursor)
  });

  useEffect(() => {
    onFetchForums();
    onFetchPosts();
  }, [])

  return (
    <Page title="Discussion Board">
      <div ref={infiniteRef}>
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
          <PostsListSkeleton />
        }
        <Grid item xs={12} md={10}>
            <Box component={Paper}>
              <Spinner/>
            </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
        <ForumsList forums={forums} loading={forumsLoading}/>
      </Grid>
    </Grid>
    </div>
      {/* {postsError ? null : <div ref={loader}></div>} */}
  </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.forums.forums,
    forumsLoading: state.forums.loading,
    forumsError: state.forums.error,
    posts: state.posts.posts,
    postsCursor: state.posts.cursor,
    postsHasNextPage: state.posts.hasNextPage,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onClearPosts: () => dispatch(clearPosts()),
    onFetchPosts: (cursor) => dispatch(fetchPosts(null, cursor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);