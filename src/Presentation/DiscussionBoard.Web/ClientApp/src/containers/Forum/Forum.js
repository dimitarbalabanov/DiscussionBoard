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

import PostCard from '../../components/PostCard';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  postCard: {
    height: '100%'
  }
}));

const Forum = props => {
  const classes = useStyles();

  const { onFetchForum } = props;
  const { forumId } = props.match.params;

  useEffect(() => {
    onFetchForum(forumId);
  }, [onFetchForum, forumId]);

  let forum = (
    <Box textAlign="center">
      <CircularProgress size={150} />
    </Box>
  );

  if (!props.loading && props.forum) {
    console.log(props.forum)
    forum = (
      <Box mt={3}>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {props.forum.title}
        </Typography>
        <Grid
          container
          spacing={3}
          justify="center"
        >
          {props.forum.posts.map((post) => (
            <Grid
              item
              key={post.id}
              xs={8}
            >
              <PostCard
                className={classes.postCard}
                post={post}
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
      title="Forum"
    >
      <Container maxWidth={false}>
        {forum}
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    forum: state.forum.forum,
    loading: state.forum.loading,
    error: state.forum.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(actions.fetchForumById(forumId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);
