import React from 'react';
import Page from '../../components/Page/Page';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchForumById, fetchPosts } from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserCard from '../../components/User/UserCard';
import ContentTabs from '../../components/User/ContentTabs';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
    border: '1px solid',
    borderRadius: '5px'
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

const UserProfile = (props) => {
  const classes = useStyles();

  const { forumId } = 1;

  const { 
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
  } = props;
  
  useEffect(() => {
    onFetchPosts(forumId);
  }, [onFetchPosts, forumId]);

  return (
    <Page className={classes.root} title={"u/CoolGuy"}>
      <Grid 
        container
        spacing={10}
        direction="row"
        alignItems="flex-start"
      >  
        <Grid container item xs={12} md={8} spacing={2} justify="flex-end" >
          <Grid item xs={12} md={10} className={classes.mainGrid}>
            <ContentTabs posts={posts} loading={postsLoading} error={postsError}/>
          </Grid>
        </Grid>
        
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start" >
          <Grid item md={10}>
            <UserCard />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
    forum: state.forum.forum,
    forumLoading: state.forum.loading,
    forumError: state.forum.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(fetchForumById(forumId)),
    onFetchPosts: (forumId) => dispatch(fetchPosts(forumId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);