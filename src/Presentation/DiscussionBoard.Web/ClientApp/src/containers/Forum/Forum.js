import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Spinner from '../../components/Spinner/Spinner';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import Page from '../../components/Page/Page';
import ForumSidebar from './components/ForumSidebar/ForumSidebar';
import ForumHeading from './components/ForumHeading/ForumHeading';
import PostCard from './components/PostCard/PostCard';
import CreatePost from './components/CreatePost/CreatePost';
import * as actions from '../../store/actions';

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
    loading, 
    //error,
    newPostId,
    newPostLoading,
    newPostError,
    onCreatePost,
    onFetchForum
  } = props;
  
  useEffect(() => {
    onFetchForum(forumId);
  }, [onFetchForum, forumId]);

  let forumDiv = <Spinner />

  if (!loading && forum) {
    forumDiv = (
      <React.Fragment>
        <ForumHeading forum={forum} />
        <ToggleButton 
          title={"Add a post"} 
          component={CreatePost} 
          forumId={forumId} 
          postId={newPostId} 
          loading={newPostLoading} 
          error={newPostError} 
          onCreatePost={onCreatePost}
        />
        <Grid container spacing={4}>
          {forum.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Page className={classes.root} title={forum ? forum.title : "Discussion Board"}>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={9}>
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
    loading: state.forum.loading,
    error: state.forum.error,
    newPostId: state.forum.newPostId,
    newPostLoading: state.forum.newPostLoading,
    newPostError: state.forum.newPostError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId)),
    onCreatePost: (post) => dispatch(actions.createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);