import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchHomePosts,
  clearHomePosts,
  setHomeSort,
  setHomeTop
} from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import PostsSorting from '../../components/PostsSorting/PostsSorting';
import useTraceUpdate from '../../hooks/useTraceUpdate';
import TrendingForumsCard from '../../components/Forum/TrendingForumsCard/TrendingForumsCard';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';

const Home = props => {

  const { 
    forums,
    forumsLoading,
    forumsError,
    posts,
    postsLoading,
    postsError,
    sort,
    top,
    cursor,
    hasNextPage,
    onFetchForums,
    onFetchPosts,
    onClearPosts,
    onSetSort,
    onSetTop,
    isAuthenticated,
  } = props;

  useEffect(() => {
    if (forums.length < 1) {
      console.log("inside forums use effect")
      onFetchForums();
    }
  }, [onFetchForums, forums.length]);
  
  return (
    <Page title="Discussion Board">
      <Grid 
        container
        direction="row"
        alignItems="center"
        justify="center"
      > 

          <CreatePostButton isAuthenticated={isAuthenticated}/>
          <ForumsList forums={forums} loading={forumsLoading}/>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.forums.forums,
    forumsLoading: state.forums.loading,
    forumsError: state.forums.error,
    posts: state.home.posts,
    postsLoading: state.home.loading,
    postsError: state.home.error,
    sort: state.home.sort,
    top: state.home.top,
    cursor: state.home.cursor,
    hasNextPage: state.home.hasNextPage,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onClearPosts: () => dispatch(clearHomePosts()),
    onSetSort: (sort) => dispatch(setHomeSort(sort)),
    onSetTop: (top) => dispatch(setHomeTop(top)),
    onFetchPosts: (sort, top, cursor) => dispatch(fetchHomePosts(sort, top, cursor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);