import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

import Page from '../../components/Common/Page';

import ForumCard from '../../components/Forum/ForumCard';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  forumCard: {
    height: '100%'
  }
}));

const Home = props => {
  const classes = useStyles();

  const { onFetchForums } = props;

  useEffect(() => {
    onFetchForums();
  }, [onFetchForums]);

  let forums = (
    <Box textAlign="center">
      <CircularProgress size={150} />
    </Box>
  );

  if (!props.loading) {
    forums = (
      <Box mt={3}>
        <Grid
          container
          spacing={3}
          justify="center"
        >
          {props.forums.map((forum) => (
            <Grid
              item
              key={forum.id}
              xs={8}
            >
              <ForumCard
                className={classes.forumCard}
                forum={forum}
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
      title="Discussion Board"
    >
      <Container maxWidth={false}>
        {/* <SearchToolbar /> */}
        {forums}
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    forums: state.home.forums,
    loading: state.home.loading,
    error: state.home.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(actions.fetchForums())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
