import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from '../../components/Page';
import CreateCommentModal from '../../components/CreateCommentModal';

import CommentCard from '../../components/CommentCard';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  commentCard: {
    height: '100%'
  }
}));

const Post = props => {
  const classes = useStyles();

  const { onFetchPost } = props;
  const { postId } = props.match.params;

  useEffect(() => {
    onFetchPost(postId);
  }, [onFetchPost, postId]);

  let post = (
    <Box textAlign="center">
      <CircularProgress size={150} />
    </Box>
  );

  if (!props.loading && props.post) {
    console.log(props.post)
    post = (
      <Box mt={3}>
        <Box mt={3}>
          <CreateCommentModal postId={postId} loading={props.newCommentLoading} error={props.newCommentError} onCreateComment={props.onCreateComment} />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {props.post.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {props.post.content}
        </Typography>
        <Grid
          container
          spacing={3}
          justify="center"
        >
          {props.post.comments.map((comment) => (
            <Grid
              item
              key={comment.id}
              xs={8}
            >
              <CommentCard
                className={classes.commentCard}
                comment={comment}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Page
      className={classes.root}
      title="Post"
    >
      <Container maxWidth={false}>
        {post}
      </Container>
    </Page>
  );
};

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