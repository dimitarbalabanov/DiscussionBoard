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
    //comments,
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
    deletePostSuccess,
    onSetPostSort,
    onSetPostTop
  } = props;
  

  const post = postsById[postId];
  const forum = post !== undefined && forumsById[post.forumId] !== undefined ? forumsById[post.forumId] : null; 

  useEffect(() => {
    if (post === undefined) {
      onFetchPost(postId);
    }
  }, [onFetchPost, post, postId]);

  useEffect(() => {
    if (post !== undefined && post.comments !== undefined && post.comments.length === 0) {
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
          md={7} 
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
              commentsLoading={commentsLoading}
              onCreateComment={onCreateComment}
              createCommentError={createCommentError}
              createCommentLoading={createCommentLoading}
              onDeleteComment={onDeleteComment}
              isAuthenticated={isAuthenticated}
              username={username}
            >
            </PostDetailsCard>
            <div className={classes.mainGrid}>
                {!commentsLoading && post !== undefined && post.comments !== undefined && post.comments.lenght !== 0?
                   post.comments.map(id => 
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
                  />) : <Box m={5}><Spinner /></Box> }
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
    postsById: state.entities.posts.byId,
    commentsById: state.entities.comments.byId,
    forumsById: state.entities.forums.byId,
    // postLoading: state.post.postLoading,
    // deletePostSuccess: state.post.deletePostSuccess,
    // createPostVoteLoading: state.post.createPostVoteLoading,
    // updatePostVoteLoading: state.post.updatePostVoteLoading,
    // deletePostVoteLoading: state.post.deletePostVoteLoading,
    // createSavedPostLoading: state.post.createSavedPostLoading,
    // deleteSavedPostLoading: state.post.deleteSavedPostLoading,
    // commentsLoading: state.comments.commentsLoading,
    // createCommentLoading: state.comments.createCommentLoading,
    // createCommentError: state.comments.createCommentError,
    // deleteCommentLoading: state.comments.deleteCommentLoading,
    // deleteCommentId: state.comments.deleteCommentId,
    // updateCommentLoading: state.comments.updateCommentLoading,
    // updateCommentError: state.comments.updateCommentError,
    // updateCommentId: state.comments.updateCommentId,
    // createCommentVoteLoading: state.comments.createCommentVoteLoading,
    // updateCommentVoteLoading: state.comments.updateCommentVoteLoading,
    // deleteCommentVoteLoading: state.comments.deleteCommentVoteLoading,
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId)),
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onSetPostSort: (postId, sort) => dispatch(actions.setPostSort(postId, sort)),
    onSetPostTop: (postId, top) => dispatch(actions.setPostTop(postId, top)),
    onUpdatePost: (postId, title, content) => dispatch(actions.updatePost(postId, title, content)),
    onDeletePost: (postId) => dispatch(actions.deletePost(postId)),
    onCreatePostVote: (postId, type) => dispatch(actions.createPostVote(postId, type)),
    onUpdatePostVote: (postId, voteId, type) => dispatch(actions.updatePostVote(postId, voteId, type)),
    onDeletePostVote: (postId, voteId, type) => dispatch(actions.deletePostVote(postId, voteId, type)),
    onCreateSavedPost: (postId) => dispatch(actions.createSavedPost(postId)),
    onDeleteSavedPost: (postId) => dispatch(actions.deleteSavedPost(postId)),
    onFetchComments: (postId, sort, top, cursor) => dispatch(actions.fetchComments(postId, sort, top, cursor)),
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