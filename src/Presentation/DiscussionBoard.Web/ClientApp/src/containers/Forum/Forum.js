import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Spinner from '../../components/Spinner/Spinner';
import Page from '../../components/Page/Page';
import ForumSidebar from './components/ForumSidebar/ForumSidebar';
import ForumHeading from './components/ForumHeading/ForumHeading';
import PostCard from './components/PostCard/PostCard';
import { fetchForumById, createPost, fetchAllPosts } from '../../store/actions';

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
    //isAuth
  } = props;
  
  useEffect(() => {
    onFetchForum(forumId);
  }, [onFetchForum, forumId]);

  if(createPostSuccess) {
    onCreatePostReset();
    return <Redirect to={`/posts/${newPostId}`} />
  }

  let forumDiv = <Spinner />

  if (!forumLoading && forum) {
    forumDiv = (
      <React.Fragment>
        {/* <CreatePost 
            component={CreatePost}
            forumId={forumId} 
            loading={createPostLoading} 
            onCreatePost={onCreatePost} /> */}
        <ForumHeading forum={forum} />
        <Grid container spacing={4}>
          {/* {forum.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Page className={classes.root} title={forum ? forum.title : "Discussion Board"}>
      <Grid container>
        <Grid item xs={12} md={8}>
          { forumDiv }
        </Grid>
        <ForumSidebar />
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forum: state.forum.forum,
    forumLoading: state.forum.forumLoading,
    forumError: state.forum.forumError,
    createPostLoading: state.forum.createPostLoading,
    createPostError: state.forum.createPostError,
    createPostSuccess: state.forum.createPostSuccess,
    newPostId: state.forum.newPostId,
    isAuth: state.auth.token !== null,
    //showSnackbar: state.snackbar.show,
    //type: state.snackbar.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(fetchForumById(forumId)),
    onFetchForumPosts: (forumId) => dispatch(fetch(forumId)),
    onCreatePost: (post) => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);