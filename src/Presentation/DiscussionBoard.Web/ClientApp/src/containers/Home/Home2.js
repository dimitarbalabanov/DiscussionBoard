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
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import PostsSorting from '../../components/PostsSorting/PostsSorting';
import AllForumsCard from '../../components/Forum/AllForumsCard/AllForumsCard';

const useStyles = makeStyles((theme) => ({
  forumGrid: {
    marginLeft: theme.spacing(2),
  }
}));

const Home = props => {
  const classes = useStyles();
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
    postsById,
    allPostIds,
    forumsById,
    allForumIds
  } = props;

  useEffect(() => {
    if(allPostIds.length < 10) {
      onFetchPosts(sort, top);
      }
    }, [onFetchPosts]);
    
  useEffect(() => {
     if (allForumIds.length < 10) {
      onFetchForums();
       }
    }, [onFetchForums]);
      
  const observeBorder = useCallback(
    node => {
      if (node !== null) {
        new IntersectionObserver(
          entries => {
            entries.forEach(en => {
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
  
  return (
    <Page title="Discussion Board">
      <Grid 
        container
        direction="row"
        justify="center"
      > 
        <Grid 
          container
          item 
          xs={12}
          md={6} 
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
            posts={postsById} 
            allIds={allPostIds} 
            loading={postsLoading} 
            error={postsError}/>
          {postsLoading && 
            <Grid item xs={12} md={10}>
              <Box component={Paper}>
                <Spinner />
              </Box>
            </Grid>}
          {/* {cursor && <div data-testid="bottom-border" ref={observeBorder} />} */}
        </Grid>
        <Grid 
          className={classes.forumGrid} 
          container 
          item 
          xs={12} 
          md={3} 
          spacing={2} 
          justify="flex-start"
        >
          <AllForumsCard forums={forumsById} allIds={allForumIds} loading={forumsLoading}/>
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    postsById: state.posts2.byId,
    allPostIds: state.posts2.allIds,
    forumsById: state.forums2.byId,
    allForumIds: state.forums2.allIds,

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