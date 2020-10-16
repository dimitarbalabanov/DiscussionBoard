import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts
} from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page/Page';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';

const Home = props => {
  const { 
    forums,
    forumsLoading,
    //forumsError,
    posts,
    postsLoading,
    postsError,
    onFetchForums,
    onFetchPosts
  } = props;

  useEffect(() => {
    onFetchForums();
    onFetchPosts();
  }, [onFetchForums, onFetchPosts]);

  return (
    <Page title="Discussion Board">
    <Grid 
      container
      spacing={10}
      direction="row"
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
    forums: state.forums.forums,
    forumsLoading: state.forums.loading,
    forumsError: state.forums.error,
    posts: state.posts.posts,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onFetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);