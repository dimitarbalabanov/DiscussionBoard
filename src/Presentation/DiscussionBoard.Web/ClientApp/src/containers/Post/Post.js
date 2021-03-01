import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Page/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../components/Spinner/Spinner';
import PostSidebar from '../../components/Post/PostSidebar/PostSidebar';
import PostDetailsCard from '../../components/Post/PostDetailsCard/PostDetailsCard';
import CommentCard from '../../components/Comment/CommentCard/CommentCard';
import AboutForumCard2 from '../../components/Forum/AboutForumCard/AboutForumCard2';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
    border: '1px solid',
    borderRadius: '5px'
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(3)
  }
}));

const Post = (props) => {
  const classes = useStyles();

  const { postId } = props.match.params;

  const {
    forum,
    post,
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
    onFetchForum
  } = props;
  
  const forumId = post !== null ? post.forumId : null;

  useEffect(() => {
    onFetchPost(postId);
    onFetchComments(postId);
  }, [onFetchPost, onFetchComments, postId]);

  useEffect(() => {
    if(forumId !== null) {
      onFetchForum(forumId);
    } 
  }, [onFetchForum, forumId]);
  console.log(props)
  let postDiv = <Spinner />;
  let commentsDiv = <Spinner />;

  if (!postLoading && post && !commentsLoading) {
    postDiv = <PostDetailsCard 
      post={post} 
      postsLoading={postLoading} 
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
    />
  }
  
  if (!commentsLoading && comments) {
    commentsDiv = comments.map(comment => 
      <CommentCard 
        key={comment.id}
        comment={comment}
        onDeleteComment={onDeleteComment}
        deleteCommentLoading={deleteCommentLoading}
        deleteCommentId={deleteCommentId}
        onUpdateComment={onUpdateComment}
        updateCommentLoading={updateCommentLoading}
        updateCommentId={updateCommentId}
        onCreateCommentVote={onCreateCommentVote}
        createCommentVoteError={createCommentVoteError}
        createCommentVoteLoading={createCommentVoteLoading}
        onUpdateCommentVote={onUpdateCommentVote}
        updateCommentVoteError={updateCommentVoteError}
        updateCommentVoteLoading={updateCommentVoteLoading}
        onDeleteCommentVote={onDeleteCommentVote}
        deleteCommentVoteError={deleteCommentVoteError}
        deleteCommentVoteLoading={deleteCommentVoteLoading}
        isAuthenticated={isAuthenticated}
      />)
  }

  return (
    <Page className={classes.root} title={post ? post.title : "Discussion Board"}>
      <Grid 
        container
        spacing={10}
        direction="row"
        alignItems="flex-start"
      >  
        <Grid container item xs={12} md={8} spacing={2} justify="flex-end" >
          <Grid item xs={12} md={10} className={classes.mainGrid}>
            {postDiv}
            {commentsDiv}
          </Grid>
        </Grid>
        
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start" >
        { forum ? <Grid item md={10}>
            <AboutForumCard2 forum={forum}  />
          </Grid> : null}
          <PostSidebar />
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forum: state.forum.forum,

    post: state.post.post,
    postLoading: state.post.postLoading,
    postError: state.post.postError,

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

    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId)),
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onCreatePostVote: (postId, type) => dispatch(actions.createPostVote(postId, type)),
    onUpdatePostVote: (postId, voteId, type) => dispatch(actions.updatePostVote(postId, voteId, type)),
    onDeletePostVote: (postId, voteId, type) => dispatch(actions.deletePostVote(postId, voteId, type)),
    onCreateSavedPost: (postId) => dispatch(actions.createSavedPost(postId)),
    onDeleteSavedPost: (postId) => dispatch(actions.deleteSavedPost(postId)),
    onFetchComments: (postId) => dispatch(actions.fetchComments(postId)),
    onCreateComment: (content, postId) => dispatch(actions.createComment(content, postId)),
    onUpdateComment: (commentId, content) => dispatch(actions.updateComment(commentId, content)),
    onDeleteComment: (commentId) => dispatch(actions.deleteComment(commentId)),
    onCreateCommentVote: (commentId, type) => dispatch(actions.createCommentVote(commentId, type)),
    onUpdateCommentVote: (commentId, voteId, type) => dispatch(actions.updateCommentVote(commentId, voteId, type)),
    onDeleteCommentVote: (commentId, voteId, type) => dispatch(actions.deleteCommentVote(commentId, voteId, type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);