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
import CreatePostButton2 from '../../components/CreatePostButton/CreatePostButton2';
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

  console.log(posts);

  useEffect(() => {
    if(posts.length < 1) {
      onFetchPosts(sort, top);
    }
  }, [onFetchPosts, sort, top]);

  useEffect(() => {
    if (forums.length < 1) {
      console.log("inside forums use effect")
      onFetchForums();
    }
  }, [onFetchForums, forums.length]);
  
  const observeBorder = useCallback(
    node => {
      if (node !== null) {
        console.log("created");
        new IntersectionObserver(
          entries => {
            entries.forEach(en => {
              console.log(en);
              if (en.intersectionRatio === 1) {
                console.log("prashtam zaqvka s kursor" + cursor)
                setTimeout(() => onFetchPosts(sort, top, cursor), 500);
              }
            });
          },
          { threshold: 1 }
        ).observe(node);
      }
    },
    [onFetchPosts, sort, top, cursor]
  );
  
  // function renderBottomBorder() {
  //   return <div data-testid="bottom-border" ref={observeBorder} />;
  // }
  
  return (
    <Page title="Discussion Board">
      <Grid 
        container
        spacing={10}
        direction="row"
        alignItems="flex-start"
      > 
        <Grid 
          container
          item xs={12}
          md={8} 
          spacing={2} 
          justify="flex-end"
        >
          <CreatePostButton isAuthenticated={isAuthenticated}/>
          <PostsSorting 
            sort={sort}
            top={top} 
            onSetSort={onSetSort} 
            onSetTop={onSetTop}
          />
          <PostsList 
            posts={posts} 
            loading={postsLoading} 
            error={postsError}/>
          {postsLoading && 
            <Grid item xs={12} md={10}>
              <Box component={Paper}>
                <Spinner />
              </Box>
            </Grid>}
          {cursor && <div data-testid="bottom-border" ref={observeBorder} />}
        </Grid>
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          <TrendingForumsCard forums={forums} loading={forumsLoading}/>
          <CreatePostButton2 />
        </Grid>
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