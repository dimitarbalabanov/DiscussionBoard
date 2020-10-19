import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Page/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Spinner from '../../components/Spinner/Spinner';
import PostSidebar from './components/PostSidebar/PostSidebar';
import PostHeading from './components/PostHeading/PostHeading';
import CommentCard from './components/CommentCard/CommentCard';
import CreateComment from './components/CreateComment/CreateComment';
import PostDetailsCard from '../../components/Post/PostDetailsCard/PostDetailsCard';

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
    // deletePostLoading,
    // deletePostSuccess,
    // deletePostError,
    // onDeletePost,
    // createCommentSuccess,
    // createCommentLoading,
    // createCommentError,
    // onCreateComment
  } = props;

  useEffect(() => {

    onFetchPost(postId);
    onFetchComments(postId);

  }, [onFetchPost, onFetchComments, postId]);

  let postDiv = <Spinner />;
  let commentsDiv = <Spinner />;

  // if (!commentsLoading && comments && comments.length !== 0) {
  //   commentsDiv = comments.map((comment) => (
  //     <CommentCard
  //       key={comment.id}
  //       comment={comment}
  //       // onCreateVote={onCreateVote}
  //       // onDeleteComment={onDeleteComment}
  //       // deleteCommentError={deleteCommentError}
  //       // deleteCommentLoading={deleteCommentLoading}
  //       // deleteCommentSuccess={deleteCommentSuccess}
  //     />
  //   ));
  // };

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
      deleteCommentLoading={deleteCommentLoading}
      deleteCommentId={deleteCommentId}
    />
  }
  
  return (
    <Page className={classes.root} title={post ? post.title : "Discussion Board"}>
      <Grid 
        container
        spacing={10}
        direction="row"
        alignItems="flex-start"
      >  
        <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
          <Grid item xs={12} md={10}>
            {postDiv}
          </Grid>
        </Grid>
        
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">

          <PostSidebar />

        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onFetchComments: (postId) => dispatch(actions.fetchComments(postId)),
    onCreateComment: (content, postId) => dispatch(actions.createComment(content, postId)),
    onDeleteComment: (commentId) => dispatch(actions.deleteComment(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);