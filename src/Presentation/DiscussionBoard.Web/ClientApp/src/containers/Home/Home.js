import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Heading from './components/Heading/Heading';
import AlternateHeading from './components/Heading/AlternateHeading';
import ForumCard from './components/ForumCard/ForumCard';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const Home = props => {
  const classes = useStyles();

  const { 
    forums,
    loading,
    onFetchForums
   } = props;

  useEffect(() => {
    onFetchForums();
  }, [onFetchForums]);

  let forumsDiv = <Spinner />;

  if (!loading) {
    forumsDiv = (
      <Grid container spacing={4}>
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </Grid>
    );
  }

  return (
    <Page className={classes.root} title="Discussion Board">
      <AlternateHeading />
      {forumsDiv}
    </Page>
  );
}

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