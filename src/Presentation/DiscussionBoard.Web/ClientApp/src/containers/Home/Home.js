import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts,
  clearPosts
} from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import PostsSorting from '../../components/PostsSorting/PostsSorting';
import useTraceUpdate from '../../hooks/useTraceUpdate';
import AllForumsCard from '../../components/Forum/AllForumsCard/AllForumsCard';
import ForumsList from '../../components/Forum/ForumsList/ForumsList';

const Home = props => {
  useTraceUpdate(props)
  const { 
    forums,
    forumsLoading,
    //forumsError,
    posts,
    postsCursor,
    //postsHasNextPage,
    postsLoading,
    postsError,
    onFetchForums,
    onFetchPosts,
    isAuthenticated,
    onClearPosts
  } = props;

  const [sort, setSort] = React.useState(1);
  const [top, setTop] = React.useState('');

  const onSetSort = useCallback(newSort => setSort(newSort), [setSort]);
  const onSetTop = useCallback(newTop => setTop(newTop), [setTop]);
  
  useEffect(() => {
    console.log("home rendering")
  });


  useEffect(() => {
    onClearPosts();
    onFetchPosts(sort, top);
  }, [onFetchPosts, sort, top]);


  useEffect(() => {
    if (forums.length < 1) {
      console.log("fetching forums")
      onFetchForums();
    }
  }, [onFetchForums, forums.length]);

  const observeBorder = useCallback(
    node => {
      console.log("viknaha me")
      if (node !== null) {
        console.log("created");
        new IntersectionObserver(
          entries => {
            entries.forEach(en => {
              console.log(en);
              if (en.intersectionRatio === 1) {
                console.log("prashtam zaqvka s kursor" + postsCursor)
                //setTimeout(() => loadMore(), 1000); // 1 sec delay
                onFetchPosts(sort, top, postsCursor);
              }
            });
          },
          { threshold: 1 }
        ).observe(node);
      }
    },
    [onFetchPosts, sort, top, postsCursor]
  );
  
  // function renderBottomBorder() {
  //   return <div data-testid="bottom-border" ref={observeBorder} />;
  // }
  
  return (
    <Page title="Discussion Board">
      <Grid 
        container
        spacing={10}
        direction="row"
        alignItems="flex-start"
      > 
        <Grid container item xs={12} md={8} spacing={2} justify="flex-end">
          <CreatePostButton isAuthenticated={isAuthenticated}/>
          <PostsSorting sort={sort} top={top} onSetSort={onSetSort} onSetTop={onSetTop}/>
          <PostsList posts={posts} loading={postsLoading} error={postsError}/>
          {postsLoading && 
          <Grid item xs={12} md={10}>
            <Box component={Paper}>
              <Spinner />
            </Box>
          </Grid>}
          {postsCursor && <div data-testid="bottom-border" ref={observeBorder} />}
        </Grid>
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          {/* <ForumsList forums={forums} loading={forumsLoading}/> */}
          <AllForumsCard forums={forums} loading={forumsLoading}/>
        </Grid>
      {/* {postsError ? null : <div ref={loader}></div>} */}
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
    postsCursor: state.posts.cursor,
    postsHasNextPage: state.posts.hasNextPage,
    postsLoading: state.posts.loading,
    postsError: state.posts.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onClearPosts: () => dispatch(clearPosts()),
    onFetchPosts: (sort, top, cursor) => dispatch(fetchPosts(sort, top, null, cursor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);