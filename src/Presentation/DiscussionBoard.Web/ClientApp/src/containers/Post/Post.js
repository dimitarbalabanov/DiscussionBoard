import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Page/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Spinner from '../../components/Spinner/Spinner';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import PostSidebar from './components/PostSidebar/PostSidebar';
import PostHeading from './components/PostHeading/PostHeading';
import CommentCard from './components/CommentCard/CommentCard';
import CreateComment from './components/CreateComment/CreateComment';

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
    loading,
    //error,
    newCommentId,
    newCommentLoading,
    newCommentError,
    onCreateComment,
    onFetchPost
  } = props;

  useEffect(() => {
    onFetchPost(postId);
  }, [onFetchPost, postId]);

  let postDiv = <Spinner />

  if (!loading && post) {
    postDiv = 
      <React.Fragment>
        <PostHeading post={post} />
        <ToggleButton 
          title={"Add a comment"}
          component={CreateComment}
          postId={postId} 
          newCommentId={newCommentId} 
          loading={newCommentLoading} 
          error={newCommentError} 
          onCreateComment={onCreateComment}
        />
        <Divider />
        {post.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </React.Fragment>
  }
  
  return (
    <Page className={classes.root} title={post ? post.title : "Discussion Board"}>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={9}>
          {postDiv}
        </Grid>
        <PostSidebar />
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    post: state.post.post,
    loading: state.post.loading,
    error: state.post.error,
    newCommentId: state.post.newCommentId,
    newCommentLoading: state.post.newCommentLoading,
    newCommentError: state.post.newCommentError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPost: (postId) => dispatch(actions.fetchPostById(postId)),
    onCreateComment: (comment) => dispatch(actions.createComment(comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);