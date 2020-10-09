import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page/Page';
import Snackbar from '../../components/Snackbar/Snackbar';
import ForumsList from './components/ForumList/ForumsList';
import HomePostsList from './components/HomePostsList/HomePostsList';
//import Search from '../../components/SearchToolbar/SearchToolbar';
//import MovieCreationIcon from '@material-ui/icons/MovieCreation';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import ComputerIcon from '@material-ui/icons/Computer';
//import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
//import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    //marginTop: theme.spacing(2),
  }
}));

//const icons = [<MovieCreationIcon />, <MusicNoteIcon />, <ComputerIcon />, <VideogameAssetIcon />, <AddIcon />]

const Home = props => {
  const classes = useStyles();

  const { 
    forums,
    forumsLoading,
    forumsError,
    onFetchForums,
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
    onCloseSnackbar
    // showSnackbar,
    // type
   } = props;

  useEffect(() => {
    if (forums.length === 0) {
      onFetchForums();
    }

    onFetchPosts();
  }, [onFetchForums, onFetchPosts]);

  return (
    <Page className={classes.root} title="Discussion Board">
      {/* { forumsError ? <Snackbar message={forumsError} type="error" reset={() => {}}/> : null }
      { postsError ? <Snackbar message={postsError} type="error" reset={() => {}}/> : null } */}
      <Grid container className={classes.mainGrid}>
      <Snackbar show={props.show} type={props.type} message={props.message} onClose={onCloseSnackbar}/>
        <HomePostsList posts={posts} loading={postsLoading} />
        <ForumsList forums={forums} loading={forumsLoading}/>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.home.forums,
    forumsLoading: state.home.forumsLoading,
    forumsError: state.home.forumsError,
    posts: state.home.posts,
    postsLoading: state.home.postsLoading,
    postsError: state.home.postsError,
    show: state.snackbar.show,
    type: state.snackbar.type,
    message: state.snackbar.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onFetchForums: () => dispatch(actions.fetchForums()),
    // onFetchPosts: () => dispatch(actions.fetchPosts()),
    onFetchForums: () => dispatch(actions.newFetchForums()),
    onFetchPosts: () => dispatch(actions.newFetchPosts()),
    onCloseSnackbar: () => dispatch(actions.hideSnackbar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);