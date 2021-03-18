import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Page/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../components/Spinner/Spinner';
import PostDetailsCard from '../../components/Post/PostDetailsCard/PostDetailsCard';
import CommentCard from '../../components/Comment/CommentCard/CommentCard';
import PostForumCard from '../../components/Forum/PostForumCard/PostForumCard';
import { Box } from '@material-ui/core';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.white,
    // borderColor: theme.palette.primary.main,
    // border: '1px solid',
    // borderRadius: '5px'
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(3)
  },
  spinner: {
    marginTop: theme.spacing(10)
  }
}));

const Post = (props) => {
  const classes = useStyles();

  const { postId } = props.match.params;

  const {
    //forum,
    //post,
    postLoading,
    //postError,
    onFetchPost,
    onCreatePostVote,
    createPostVoteError,
    createPostVoteLoading,
    onUpdatePostVote,
    updatePostVoteError,
    updatePostVoteLoading,
    onDeletePostVote,
    deletePostVoteError,
    deletePostVoteLoading,
    onCreateSavedPost,
    createSavedPostError,
    createSavedPostLoading,
    onDeleteSavedPost,
    deleteSavedPostError,
    deleteSavedPostLoading,
    comments,
    //commentsError,
    commentsLoading,
    onFetchComments,
    createCommentError,
    createCommentLoading,
    onCreateComment,
    onDeleteComment,
    deleteCommentLoading,
    deleteCommentId,
    onUpdateComment,
    //updateCommentError,
    updateCommentId,
    updateCommentLoading,
    onCreateCommentVote,
    createCommentVoteError,
    createCommentVoteLoading,
    onUpdateCommentVote,
    updateCommentVoteError,
    updateCommentVoteLoading,
    onDeleteCommentVote,
    deleteCommentVoteError,
    deleteCommentVoteLoading,
    isAuthenticated,
    onFetchForum,
    postsById,
    commentsById,
    forumsById,
    username,
    onUpdatePost,
    onDeletePost,
    onSetCommentsSort,
    deletePostSuccess
  } = props;
  

  const post = postsById[postId];
  const forum = post !== undefined && forumsById[post.forumId] !== undefined ? forumsById[post.forumId] : null; 

  useEffect(() => {
    if (post === undefined) {
      onFetchPost(postId);
    }
  }, [onFetchPost, post, postId]);

  useEffect(() => {
    if (post !== undefined && post.comments === undefined) {
      onFetchComments(postId);
    }
  }, [onFetchComments, post, postId]);

  useEffect(() => {
    if (post !== undefined && forumsById[post.forumId] === undefined
      || post !== undefined && forumsById[post.forumId] !== undefined && !forumsById[post.forumId].description) {
      onFetchForum(post.forumId);
    }
  }, [onFetchForum, post]);

  
  if (deletePostSuccess) {
    return <Redirect to="/" />;
  }

  let commentsDiv = post !== undefined ? <Box m={5}><Spinner /></Box> : null;
  if (!commentsLoading && post !== undefined && post.comments !== undefined) {
    commentsDiv = post.comments.map(id => 
      <CommentCard 
        key={id}
        post={post}
        comment={commentsById[id]}
        onDeleteComment={onDeleteComment}
        deleteCommentLoading={deleteCommentLoading}
        deleteCommentId={deleteCommentId}
        onUpdateComment={onUpdateComment}
        updateCommentLoading={updateCommentLoading}
        updateCommentId={updateCommentId}
        onCreateVote={onCreateCommentVote}
        createVoteError={createCommentVoteError}
        createVoteLoading={createCommentVoteLoading}
        onUpdateVote={onUpdateCommentVote}
        updateCommentVoteError={updateCommentVoteError}
        updateCommentVoteLoading={updateCommentVoteLoading}
        onDeleteVote={onDeleteCommentVote}
        deleteCommentVoteError={deleteCommentVoteError}
        deleteCommentVoteLoading={deleteCommentVoteLoading}
        isAuthenticated={isAuthenticated}
      />)
  }

  return (
    <Page title={post ? post.title : "Discussion Board"}>
      <Grid 
        container
        direction="row"
        justify="center"
      >  
        <Grid 
          container 
          item 
          xs={11} 
          md={6} 
          spacing={2}
          justify="flex-end"
        >
          <Grid 
            item 
            xs={12} 
            md={10} 
            
          >
            <PostDetailsCard 
              post={post} 
              forum={forum}
              postLoading={postLoading} 
              onUpdatePost={onUpdatePost}
              onDeletePost={onDeletePost}
              onCreatePostVote={onCreatePostVote}
              createPostVoteError={createPostVoteError}
              createPostVoteLoading={createPostVoteLoading}
              onUpdatePostVote={onUpdatePostVote}
              updatePostVoteError={updatePostVoteError}
              updatePostVoteLoading={updatePostVoteLoading}
              onDeletePostVote={onDeletePostVote}
              deletePostVoteError={deletePostVoteError}
              deletePostVoteLoading={deletePostVoteLoading}
              onCreateSavedPost={onCreateSavedPost}
              createSavedPostError={createSavedPostError}
              createSavedPostLoading={createSavedPostLoading}
              onDeleteSavedPost={onDeleteSavedPost}
              deleteSavedPostError={deleteSavedPostError}
              deleteSavedPostLoading={deleteSavedPostLoading}
              comments={comments} 
              commentsLoading={commentsLoading}
              onCreateComment={onCreateComment}
              createCommentError={createCommentError}
              createCommentLoading={createCommentLoading}
              onDeleteComment={onDeleteComment}
              isAuthenticated={isAuthenticated}
              username={username}
            />
            <div className={classes.mainGrid}>
              {commentsDiv}
            </div>
          </Grid>
        </Grid>
        <Grid 
          container 
          item 
          xs={12} 
          md={3} 
          spacing={2} 
          justify="center" 
        >
          <PostForumCard forum={forum}  />
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    postsById: state.posts2.byId,
    commentsById: state.comments2.byId,
    forumsById: state.forums2.byId,

    forum: state.forum.forum,

    post: state.post.post,
    postLoading: state.post.postLoading,
    postError: state.post.postError,

    deletePostSuccess: state.post.deletePostSuccess,
    
    createPostVoteLoading: state.post.createPostVoteLoading,
    createPostVoteError: state.post.createPostVoteError,

    updatePostVoteLoading: state.post.updatePostVoteLoading,
    updatePostVoteError: state.post.updatePostVoteError,

    deletePostVoteLoading: state.post.deletePostVoteLoading,
    deletePostVoteError: state.post.deletePostVoteError,

    createSavedPostLoading: state.post.createSavedPostLoading,
    createSavedPostError: state.post.createSavedPostError,

    deleteSavedPostLoading: state.post.deleteSavedPostLoading,
    deleteSavedPostError: state.post.deleteSavedPostError,

    comments: state.comments.comments,
    commentsLoading: state.comments.commentsLoading,
    commentsError: state.comments.commentsError,

    createCommentLoading: state.comments.createCommentLoading,
    createCommentError: state.comments.createCommentError,

    deleteCommentLoading: state.comments.deleteCommentLoading,
    deleteCommentError: state.comments.deleteCommentError,
    deleteCommentId: state.comments.deleteCommentId,

    updateCommentLoading: state.comments.updateCommentLoading,
    updateCommentError: state.comments.updateCommentError,
    updateCommentId: state.comments.updateCommentId,

    createCommentVoteLoading: state.comments.createCommentVoteLoading,
    createCommentVoteError: state.comments.createCommentVoteError,

    updateCommentVoteLoading: state.comments.updateCommentVoteLoading,
    updateCommentVoteError: state.comments.updateCommentVoteError,

    deleteCommentVoteLoading: state.comments.deleteCommentVoteLoading,
    deleteCommentVoteError: state.comments.deleteCommentVoteError,

    isAuthenticated: state.auth.token !== null,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCommentsSort: (postId, sort) => dispatch(actions.setCommentsSort(postId, sort)),
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId)),
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onUpdatePost: (postId, title, content) => dispatch(actions.updatePost(postId, title, content)),
    onDeletePost: (postId) => dispatch(actions.deletePost(postId)),
    onCreatePostVote: (postId, type) => dispatch(actions.createPostVote(postId, type)),
    onUpdatePostVote: (postId, voteId, type) => dispatch(actions.updatePostVote(postId, voteId, type)),
    onDeletePostVote: (postId, voteId, type) => dispatch(actions.deletePostVote(postId, voteId, type)),
    onCreateSavedPost: (postId) => dispatch(actions.createSavedPost(postId)),
    onDeleteSavedPost: (postId) => dispatch(actions.deleteSavedPost(postId)),
    onFetchComments: (postId) => dispatch(actions.fetchComments(postId)),
    onCreateComment: (content, postId, username) => dispatch(actions.createComment(content, postId, username)),
    onUpdateComment: (commentId, content) => dispatch(actions.updateComment(commentId, content)),
    onDeleteComment: (commentId, postId) => dispatch(actions.deleteComment(commentId, postId)),
    onCreateCommentVote: (commentId, type) => dispatch(actions.createCommentVote(commentId, type)),
    onUpdateCommentVote: (commentId, voteId, type) => dispatch(actions.updateCommentVote(commentId, voteId, type)),
    onDeleteCommentVote: (commentId, voteId, type) => dispatch(actions.deleteCommentVote(commentId, voteId, type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);