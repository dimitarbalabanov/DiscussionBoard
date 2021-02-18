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
    onCreateVote,
    createVoteError,
    createVoteLoading,
    onUpdateVote,
    updateVoteError,
    updateVoteLoading,
    onDeleteVote,
    deleteVoteError,
    deleteVoteLoading,
    isAuthenticated,
    onOpenModal,
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

  let postDiv = <Spinner />;
  let commentsDiv = <Spinner />;

  if (!postLoading && post && !commentsLoading && comments) {
    postDiv = <PostDetailsCard 
      post={post} 
      postsLoading={postLoading} 
      comments={comments} 
      commentsLoading={commentsLoading}
      onCreateComment={onCreateComment}
      createCommentError={createCommentError}
      createCommentLoading={createCommentLoading}
      onDeleteComment={onDeleteComment}
      isAuthenticated={isAuthenticated}
      onOpenModal={onOpenModal}
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
        onCreateVote={onCreateVote}
        createVoteError={createVoteError}
        createVoteLoading={createVoteLoading}
        onUpdateVote={onUpdateVote}
        updateVoteError={updateVoteError}
        updateVoteLoading={updateVoteLoading}
        onDeleteVote={onDeleteVote}
        deleteVoteError={deleteVoteError}
        deleteVoteLoading={deleteVoteLoading}
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

    createVoteLoading: state.comments.createVoteLoading,
    createVoteError: state.comments.createVoteError,

    updateVoteLoading: state.comments.updateVoteLoading,
    updateVoteError: state.comments.updateVoteError,

    deleteVoteLoading: state.comments.deleteVoteLoading,
    deleteVoteError: state.comments.deleteVoteError,

    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId)),
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onFetchComments: (postId) => dispatch(actions.fetchComments(postId)),
    onCreateComment: (content, postId) => dispatch(actions.createComment(content, postId)),
    onUpdateComment: (commentId, content) => dispatch(actions.updateComment(commentId, content)),
    onDeleteComment: (commentId) => dispatch(actions.deleteComment(commentId)),
    onCreateVote: (commentId, type) => dispatch(actions.createVote(commentId, type)),
    onUpdateVote: (commentId, voteId, type) => dispatch(actions.updateVote(commentId, voteId, type)),
    onDeleteVote: (commentId, voteId, type) => dispatch(actions.deleteVote(commentId, voteId, type)),
    onOpenModal: (type, title, message) => dispatch(actions.showModal(type, title, message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);