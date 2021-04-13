import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts,
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
import PostsSorting2 from '../../components/PostsSorting/PostsSorting2';
import AllForumsCard from '../../components/Forum/AllForumsCard/AllForumsCard';
import PostsListSkeleton from '../../components/Post/PostsListSkeleton';

const useStyles = makeStyles((theme) => ({
  forumGrid: {
    marginLeft: theme.spacing(2),
  }
}));

const Home = props => {
  const classes = useStyles();
  const { 
    forumsLoading,
    postsLoading,
    onFetchForums,
    isAuthenticated,
    postsById,
    allPostIds,
    forumsById,
    allForumIds,
    onFetchPosts,
    onSetHomeSort,
    onSetHomeTop,
    home
  } = props;

  useEffect(() => {
    if (allForumIds.length < 10) {
      onFetchForums();
    }
  }, [onFetchForums, allForumIds]);
      
  useEffect(() => {
    if (home.postIds.length === 0) {
      onFetchPosts(home.sort, home.top);
    }
  }, [onFetchPosts, home.postIds, home.sort, home.top]);

  const observeBorder = useCallback(
    node => {
      if (node !== null && home.cursor !== null) {
        new IntersectionObserver(
          entries => {
            entries.forEach(en => {
              if (en.intersectionRatio === 1) {
                console.log("prashtam zaqvka s kursor" + home.cursor)
                setTimeout(() => onFetchPosts(home.sort, home.top, home.cursor), 500);
              }
            });
          },
          { threshold: 1 }
        ).observe(node);
      }
    },
    [onFetchPosts, home.sort, home.top, home.cursor]
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
          <PostsSorting2
            home={home}
            onSetSort={onSetHomeSort} 
            onSetTop={onSetHomeTop}
          />
          {home.postIds.length === 0 &&
          <PostsListSkeleton />}
          <PostsList 
            posts={postsById} 
            allIds={home.postIds} 
            loading={postsLoading} 
          />
          {home.cursor !== null && <div data-testid="bottom-border" ref={observeBorder} />}
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
    home: state.home,
    postsById: state.entities.posts.byId,
    allPostIds: state.entities.posts.allIds,
    forumsById: state.entities.forums.byId,
    allForumIds: state.entities.forums.allIds,

    forumsLoading: state.ui.forums.forumsLoading,
    postsLoading: state.ui.posts.postsLoading,

    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onFetchPosts: (sort, top, cursor) => dispatch(fetchPosts(sort, top, null, cursor)),
    onSetHomeSort: (sort) => dispatch(setHomeSort(sort)),
    onSetHomeTop: (top) => dispatch(setHomeTop(top)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);