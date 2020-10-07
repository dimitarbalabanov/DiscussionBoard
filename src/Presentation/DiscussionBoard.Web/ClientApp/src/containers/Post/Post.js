import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Page/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Spinner from '../../components/Spinner/Spinner';
import ToggleShowButton from '../../components/ToggleShowButton/ToggleShowButton';
import PostSidebar from './components/PostSidebar/PostSidebar';
import PostHeading from './components/PostHeading/PostHeading';
import CommentCard from './components/CommentCard/CommentCard';
import CreateComment from './components/CreateComment/CreateComment';
import Snackbar from '../../components/Snackbar/Snackbar';
//import UpdatePost from './components/UpdatePost/UpdatePost';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
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
    post,
    postLoading,
    //postError,
    onFetchPost,

    //updatePostLoading,
    updatePostError,
    updatePostSuccess,
    //onUpdatePost,
    onUpdatePostReset,

    deletePostLoading,
    deletePostError,
    deletePostSuccess,
    onDeletePost,
    onDeletePostReset,

    createCommentSuccess,
    createCommentLoading,
    createCommentError,
    onCreateComment,
    onCreateCommentReset,

    newVoteLoading,
    newVoteError,
    //newCommentScore,
    onCreateVote,
    onDeleteComment,
    onDeleteCommentReset,
    deleteCommentError,
    deleteCommentLoading,
    deleteCommentSuccess,
    //isNewComment
  } = props;

  useEffect(() => {
    onFetchPost(postId);
  }, [onFetchPost, postId]);

  let postDiv = <Spinner />

  if (!postLoading && post) {
    postDiv = 
      <React.Fragment>
        <PostHeading 
          post={post}
          deletePostLoading={deletePostLoading}
          deletePostError={deletePostError}
          deletePostSuccess={deletePostSuccess}
          onDeletePost={onDeletePost}
          onDeletePostReset={onDeletePostReset}
        />
        <ToggleShowButton 
          title={"Add a comment"}
          component={CreateComment}
          postId={postId} 
          createCommentLoading={createCommentLoading} 
          createCommentError={createCommentError}
          createCommentSuccess={createCommentSuccess}
          onCreateComment={onCreateComment}
          onCreateCommentReset={onCreateCommentReset}
        />
        {createCommentLoading ? <Spinner /> : null }
        {/* <UpdatePost
          postId={postId}
          currentTitle={post.title}
          currentContent={post.content}
          onUpdatePost={onUpdatePost}
        /> */}
        <Divider />
        {post.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment} 
            loading={newVoteLoading} 
            error={newVoteError} 
            onCreateVote={onCreateVote}
            onDeleteComment={onDeleteComment}
            onDeleteCommentReset={onDeleteCommentReset}
            deleteCommentError={deleteCommentError}
            deleteCommentLoading={deleteCommentLoading}
            deleteCommentSuccess={deleteCommentSuccess}

            createVoteLoading={newVoteLoading}
          />
        ))}
      </React.Fragment>
  }
  
  return (
    <Page className={classes.root} title={post ? post.title : "Discussion Board"}>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={9}>
          {postDiv}
          {createCommentError ? <Snackbar message={createCommentError.message} type={"error"} reset={onCreateCommentReset}/> : null}
          {createCommentSuccess ? <Snackbar message="Successfully created a comment" type={"success"} reset={onCreateCommentReset}/> : null}
          {updatePostError ? <Snackbar message={updatePostError.message} type={"error"} reset={onUpdatePostReset}/> : null}
          {updatePostSuccess ? <Snackbar message="Successfully updated the post" type={"success"} reset={onUpdatePostReset}/> : null}
        </Grid>
        <PostSidebar />
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    post: state.post.post,
    postLoading: state.post.postLoading,
    postError: state.post.postError,
    updatePostLoading: state.post.updatePostLoading,
    updatePostError: state.post.updatePostError,
    updatePostSuccess: state.post.updatePostSuccess,
    deletePostLoading: state.post.deletePostLoading,
    deletePostError: state.post.deletePostError,
    deletePostSuccess: state.post.deletePostSuccess,
    createCommentLoading: state.post.createCommentLoading,
    createCommentError: state.post.createCommentError,
    createCommentSuccess: state.post.createCommentSuccess,
    newVoteLoading: state.post.newVoteLoading,
    newVoteError: state.post.newVoteError,
    deleteCommentLoading: state.post.deleteCommentLoading,
    deleteCommentError: state.post.deleteCommentError,
    deleteCommentSuccess: state.post.deleteCommentSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),

    onCreateComment: (comment) => dispatch(actions.createComment(comment)),
    onCreateCommentReset: () => dispatch(actions.createCommentReset()),

    onCreateVote: (vote) => dispatch(actions.createVote(vote)),

    onDeleteComment: (commentId) => dispatch(actions.deleteComment(commentId)),
    onDeleteCommentReset: () => dispatch(actions.deleteCommentReset()),

    onDeletePost: (postId) => dispatch(actions.deletePost(postId)),
    onDeletePostReset: () => dispatch(actions.deletePostReset()),

    onUpdatePost: (postId, content) => dispatch(actions.updatePost(postId, content)),
    onUpdatePostReset: () => dispatch(actions.updatePostReset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);