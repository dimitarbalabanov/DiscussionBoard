import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import PostsList from '../../components/Post/PostsList/PostsList';
import { fetchForumById, fetchPosts, setForumSort, setForumTop, showModal } from '../../store/actions';
import AboutForumCard from '../../components/Forum/AboutForumCard/AboutForumCard';
import ForumTitleCard from '../../components/Forum/ForumTitleCard/ForumTitleCard';
import PostsSorting from '../../components/PostsSorting/PostsSorting';
import PostCard from '../../components/Post/PostCard/PostCard';

const useStyles = makeStyles((theme) => ({
  forumGrid: {
    marginLeft: theme.spacing(2),
  }
}));

const Forum = props => {
  const classes = useStyles();

  const { forumId } = props.match.params;

  const { 
    forumLoading, 
    postsLoading,
    postsById,
    forumsById,
    onFetchPosts,
    onFetchForum,
    onSetForumSort,
    onSetForumTop,
    onOpenModal
  } = props;
  
  const forum = forumsById[forumId] !== undefined ? forumsById[forumId] : null;

  useEffect(() => {
    if (!forum || (forum && forum.description === undefined)) {
      onFetchForum(forumId);
    }
  }, [onFetchForum, forumId]);
  
  useEffect(() => {
    if (forum && forum.posts !== undefined && forum.posts.length === 0) {
      onFetchPosts(forum.sort, forum.top, forum.id, forum.cursor);
    }
  }, [onFetchPosts, forum]);

  const observeBorder = useCallback(
    node => {
      if (node !== null && forum !== null && forum.cursor !== null) {
        console.log("ima node")
        new IntersectionObserver(
          entries => {
            entries.forEach(en => {
          console.log(en)

              if (en.intersectionRatio === 1) {
                console.log("prashtam zaqvka s kursor" + forum.cursor)
                setTimeout(() => onFetchPosts(forum.sort, forum.top, forum.id, forum.cursor), 500);
              }
            });
          },
          { threshold: 1 }
        ).observe(node);
      }
    },
    [onFetchPosts, forum]
  );


  return (
    <Page title={forum ? forum.title : "Discussion Board"}>
      <ForumTitleCard forum={forum}/>
      <Grid 
        container 
        direction="row" 
        justify="center"
      >
        <Grid 
          container 
          item 
          xs={12} 
          md={6} 
          spacing={2} 
          justify="flex-end"
        >
          {forum !== null &&
          <PostsSorting 
            forumId={forum.id}
            sort={forum.sort}
            top={forum.top} 
            onSetSort={onSetForumSort} 
            onSetTop={onSetForumTop}
          />
          }
          <React.Fragment>
          {forum !== null && forum.posts !== undefined ?
            forum.posts.map((id) => (
              <Grid item xs={12} md={10} key={id}>
                <PostCard post={postsById[id]} loading={postsLoading} onOpenModal={onOpenModal} />
              </Grid>
            )) : null
          }
          </React.Fragment>
          {forum && forum.cursor && <div data-testid="bottom-border" ref={observeBorder} />}
        </Grid>
        <Grid 
          container 
          item 
          xs={12} 
          md={3} 
          spacing={2}
          justify="flex-start">
          <Grid item md={10} className={classes.forumGrid}>
            <AboutForumCard forum={forum} loading={forumLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    postsById: state.entities.posts.byId,
    allPostIds: state.entities.posts.allIds,
    forumsById: state.entities.forums.byId,
    allForumIds: state.entities.forums.allIds,

    postsLoading: state.ui.posts.postsLoading,
    forumLoading: state.ui.forums.forumsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForum: (forumId) => dispatch(fetchForumById(forumId)),
    onFetchPosts: (sort, top, forumId, cursor) => dispatch(fetchPosts(sort, top, forumId, cursor)),
    onSetForumSort: (forumId, sort) => dispatch(setForumSort(forumId, sort)),
    onSetForumTop: (forumId, top) => dispatch(setForumTop(forumId, top)),
    onOpenModal: () => dispatch(showModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forum);