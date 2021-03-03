import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import PostsList from '../../components/Post/PostsList/PostsList';
import { fetchForumById, fetchPosts } from '../../store/actions';
import ForumTitleCard from '../../components/Forum/ForumTitleCard/ForumTitleCard';
import AnotherAboutForum from '../../components/Forum/AboutForumCard/AnotherAboutForum';
import Title from '../../components/Forum/AboutForumCard/Title';
import SortingComponent from '../../components/SortingComponent/SortingComponent2';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const Forum = props => {
  const classes = useStyles();

  const { forumId } = props.match.params;

  const { 
    forum, 
    forumLoading, 
    //forumError,
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
    onFetchForum,
  } = props;
  
  useEffect(() => {
    onFetchPosts(forumId);
    onFetchForum(forumId);
  }, [onFetchForum, onFetchPosts, forumId]);

  return (
    <Page className={classes.root} title={forum ? forum.title : "Discussion Board"}>
      <Grid container spacing={10} direction="row" alignItems="flex-start">

        {/* <Grid container item xs={12} md={12} spacing={2} justify="center">
          <ForumTitleCard forum={forum} loading={forumLoading} />
        </Grid> */}

        <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
          <Title />
          {/* <ForumTitleCard forum={forum} loading={forumLoading} /> */}
          <SortingComponent />
          <PostsList posts={posts} loading={postsLoading} error={postsError}/>
        </Grid>

        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          <Grid item md={10}>
            <AnotherAboutForum forum={forum} loading={forumLoading} />
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
    onFetchPosts: (forumId) => dispatch(fetchPosts(null, null, forumId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);