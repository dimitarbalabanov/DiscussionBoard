import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page/Page';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
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
    //forumsError,
    onFetchForums,
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
    
   } = props;

  useEffect(() => {
    onFetchForums();
    onFetchPosts();
  }, [onFetchForums, onFetchPosts]);

  return (
    <Page className={classes.root} title="Discussion Board">
    <Grid 
      container
      spacing={10}
      direction="row"
      //justify="center"
      alignItems="flex-start"
    > 
      <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
        <CreatePostButton />
        <PostsList posts={posts} loading={postsLoading} error={postsError}/>
      </Grid>
      <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
        <ForumsList forums={forums} loading={forumsLoading}/>
      </Grid>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(actions.newFetchForums()),
    onFetchPosts: () => dispatch(actions.newFetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);