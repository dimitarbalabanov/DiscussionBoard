import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts,
  clearPosts
} from '../../store/actions';
//import useInfiniteScroll from '../../hooks/useInfiniteScroll/useInfiniteScroll';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
////import Box from '@material-ui/core/Box';
import Page from '../../components/Page/Page';
//import ForumsList from '../../components/Forum/ForumsList/ForumsList';
import PostsList from '../../components/Post/PostsList/PostsList';
//import PostsListSkeleton from '../../components/Post/PostsList/PostsListSkeleton';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import PopularForumsCard from '../../components/Forum/PopularForumsCard/PopularForumsCard';
//import Spinner from '../../components/Spinner/Spinner';
import SortingComponent from '../../components/SortingComponent/SortingComponent';
import useTraceUpdate from '../../hooks/useTraceUpdate';

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
    //onClearPosts
  } = props;

  const [sort, setSort] = React.useState(1);
  const [top, setTop] = React.useState('');

  const onSetSort = useCallback(newSort => setSort(newSort), [setSort]);
  const onSetTop = useCallback(newTop => setTop(newTop), [setTop]);
  
  useEffect(() => {
    console.log("home rendering")
  });

  useEffect(() => {
    console.log("fetching posts")
    onFetchPosts(sort, top);
  }, [onFetchPosts, sort, top]);

  useEffect(() => {
    console.log("fetching forums")
    onFetchForums();
  }, [onFetchForums]);

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
                onFetchPosts(postsCursor);
              }
            });
          },
          { threshold: 1 }
        ).observe(node);
      }
    },
    [onFetchPosts, postsCursor]
  );
  
  // function renderBottomBorder() {
  //   return <div data-testid="bottom-border" ref={observeBorder} />;
  // }

  function renderLoadingMessage() {
    return <p>Loading...</p>;
  }


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
          <SortingComponent sort={sort} top={top} onSetSort={onSetSort} onSetTop={onSetTop}/>
          <PostsList posts={posts} loading={postsLoading} error={postsError}/>
          {postsLoading && renderLoadingMessage()}
          {postsCursor && <div data-testid="bottom-border" ref={observeBorder} />}
          {/* {posts.length < 1 &&
            <PostsListSkeleton />
          } */}


          {/* <Grid item xs={12} md={10}>
              <Box component={Paper}>
                <Spinner/>
              </Box>
          </Grid> */}
        </Grid>
        <Grid container item xs={12} md={4} spacing={2} justify="flex-start">
          <PopularForumsCard forums={forums} loading={forumsLoading}/>
          {/* <ForumsList forums={forums} loading={forumsLoading}/> */}
        </Grid>
      </Grid>
      {/* {postsError ? null : <div ref={loader}></div>} */}
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
    onFetchPosts: (sort, top) => dispatch(fetchPosts(sort, top))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);