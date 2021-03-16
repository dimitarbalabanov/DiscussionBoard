import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import PostsList from '../../components/Post/PostsList/PostsList';
import { fetchForumById, fetchPosts } from '../../store/actions';
import AboutForumCard from '../../components/Forum/AboutForumCard/AboutForumCard';
import ForumTitleCard from '../../components/Forum/ForumTitleCard/ForumTitleCard';
import PostsSorting from '../../components/PostsSorting/PostsSorting';

const useStyles = makeStyles((theme) => ({
  forumGrid: {
    marginLeft: theme.spacing(2),
  }
}));

const Forum = props => {
  const classes = useStyles();

  const { forumId } = props.match.params;

  const { 
    //forum, 
    forumLoading, 
    //forumError,
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
    onFetchForum,
    postsById,
    allPostIds,
    forumsById,
    allForumIds
  } = props;
  
  const forum = forumsById[forumId] !== undefined ? forumsById[forumId]: null;
  useEffect(() => {
    onFetchPosts(forumId);
    onFetchForum(forumId);
  }, [onFetchForum, onFetchPosts, forumId]);

  return (
    <Page title={forum ? forum.title : "Discussion Board"}>
      <Grid container direction="row" alignItems="flex-start">
        <ForumTitleCard forum={forum}/>
        <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
          <PostsSorting />
          <PostsList posts={posts} loading={postsLoading} error={postsError}/>
        </Grid>
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          <Grid item md={10} className={classes.forumGrid}>
            <AboutForumCard forum={forum} loading={forumLoading} />
          </Grid>
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

    posts: state.posts.posts,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
    forum: state.forum.forum,
    forumLoading: state.forum.loading,
    forumError: state.forum.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(fetchForumById(forumId)),
    onFetchPosts: (forumId) => dispatch(fetchPosts(null, null, forumId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);