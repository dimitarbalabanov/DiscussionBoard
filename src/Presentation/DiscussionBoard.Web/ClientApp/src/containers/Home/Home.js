import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchForums,
  fetchPosts,
  clearPosts
} from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page/Page';
import ForumsList from '../../components/Forum/ForumsList/ForumsList2';
import PostsList from '../../components/Post/PostsList/PostsList';
import CreatePostButton2 from '../../components/CreatePostButton/CreatePostButton2';
import SortingComponent from '../../components/SortingComponent/SortingComponent2';
import useTraceUpdate from '../../hooks/useTraceUpdate';
// import RightSide from './RightSide';
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
    console.log("fetching posts")
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
          <CreatePostButton2 isAuthenticated={isAuthenticated}/>
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
          <ForumsList forums={forums} loading={forumsLoading}/>
        </Grid>
        {/* <RightSide forums={forums} loading={forumsLoading}/> */}
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
    onFetchPosts: (sort, top) => dispatch(fetchPosts(sort, top))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);