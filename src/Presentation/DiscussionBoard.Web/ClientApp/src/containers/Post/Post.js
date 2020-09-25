import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Page from '../../components/Common/Page';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostSidebar from './components/PostSidebar/PostSidebar'
import PostHeading from './components/PostHeading/PostHeading'
import CommentCard from './components/CommentCard/CommentCard'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const Post = () => {

  const classes = useStyles();

  const { onFetchPost } = props;
  const { postId } = props.match.params;

  useEffect(() => {
    onFetchPost(postId);
  }, [onFetchPost, postId]);

  return (
    <Grid container spacing={5} className={classes.mainGrid}>
      <Grid item xs={12} md={8}>
        <PostHeading post={mainFeaturedPost} />
        <Divider />
        {comments.map((comment) => (
          <CommentCard key={comment.title} comment={comment} />
        ))}
      </Grid>
      <PostSidebar />
    </Grid>
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