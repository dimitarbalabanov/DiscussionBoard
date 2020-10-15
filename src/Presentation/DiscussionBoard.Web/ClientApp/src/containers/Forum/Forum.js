import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Spinner from '../../components/Spinner/Spinner';
import Page from '../../components/Page/Page';
import PostCard from '../../components/Post/PostCard/PostCard';
import PostsList from '../../components/Post/PostsList/PostsList';
import { fetchForumById, createPost, newFetchPosts } from '../../store/actions';
import ForumTitleCard from '../../components/Forum/ForumTitleCard/ForumTitleCard';
import AboutForumCard from '../../components/Forum/AboutForumCard/AboutForumCard';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const Forum = props => {
  const classes = useStyles();

  const { forumId } = props.match.params;

  const { 
    forum, 
    forumLoading, 
    //forumError,
    createPostSuccess,
    createPostLoading,
    //createPostError,
    onFetchForum,
    onCreatePost,
    onCreatePostReset,
    newPostId,
    onFetchPosts,
    posts,
    forums,
    postsLoading,
    postsError
    //isAuth
  } = props;
  
  useEffect(() => {
    onFetchPosts(forumId);
    onFetchForum(forumId);
  }, [onFetchForum, onFetchPosts, forumId]);

  

  return (
    <Page className={classes.root} title={forum ? forum.title : "Discussion Board"}>
      <Grid container spacing={10} direction="row" alignItems="flex-start">

        <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
          <ForumTitleCard forum={forum} loading={forumLoading} />
          <PostsList posts={posts} loading={postsLoading} error={postsError}/>
        </Grid>

        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          <Grid item md={10}>
            <AboutForumCard forum={forum} loading={forumLoading} />
          </Grid>
        </Grid>
      </Grid>

    </Page>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.home.posts,
    postsLoading: state.home.postsLoading,
    postsError: state.home.postsError,
    forums: state.home.forums,
    forum: state.forum.forum,
    forumLoading: state.forum.forumLoading,
    forumError: state.forum.forumError,
    createPostLoading: state.forum.createPostLoading,
    createPostError: state.forum.createPostError,
    createPostSuccess: state.forum.createPostSuccess,
    newPostId: state.forum.newPostId,
    isAuth: state.auth.token !== null,
    //posts: state.forum.posts
    //showSnackbar: state.snackbar.show,
    //type: state.snackbar.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(fetchForumById(forumId)),
    onFetchPosts: (forumId) => dispatch(newFetchPosts(forumId)),
    onCreatePost: (post) => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);