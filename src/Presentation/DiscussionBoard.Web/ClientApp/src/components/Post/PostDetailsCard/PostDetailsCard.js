import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CommentIcon from '@material-ui/icons/Comment';
import CreateComment from '../../Comment/CreateComment/CreateComment';
import Spinner from '../../Spinner/Spinner';
import EditPost from '../EditPost/EditPost';
import Voting from '../../Voting/Voting';
import SavePostButton from '../../AUI/SavePostButton';
import PostFirstLine from '../PostFirstLine/PostFirstLine';
import image from '../../../assets/images/file-20170712-14488-19lw3sc.jpg';
import CommentsSorting from '../../CommentsSorting/CommentsSorting';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EditButton from '../../AUI/EditButton';
import DeleteButton from '../../AUI/DeleteButton';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,

  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  margin: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 140,
    paddingTop: '70.25%',
  },
  icon2: {
    color: theme.palette.text.secondary,
    fontSize: '60px'
  },
  voting: {
    backgroundColor: '#F8F8F8'
  }
}));

const PostDetailsCard = props => {
  const classes = useStyles();
  const [showUpdateForm, setUpdateForm] = useState(false);

  const handleOpen = () => {
    setUpdateForm(true);
  }
  const handleClose = () => {
    setUpdateForm(false);
  }

  const { 
    post,
    forum,
    postLoading,
    onCreatePostVote,
    createPostVoteError,
    createPostVoteLoading,
    onUpdatePostVote,
    updatePostVoteError,
    updatePostVoteLoading,
    onDeletePostVote,
    deletePostVoteError,
    deletePostVoteLoading,
    onCreateSavedPost,
    createSavedPostError,
    createSavedPostLoading,
    onDeleteSavedPost,
    deleteSavedPostError,
    deleteSavedPostLoading,
    onCreateComment,
    createCommentLoading,
    createCommentError,
    isAuthenticated,
    username,
    onUpdatePost,
    onDeletePost
  } = props;

  return (
  <Box className={classes.card}>
    {!postLoading && post !== undefined ?
    <React.Fragment>
      <Box className={classes.voting}>
        <Voting 
          className={classes.voting}
          id={post.id}
          voteType={post.voteType}
          voteId={post.voteId}
          votesScore={post.votesScore}
          onCreateVote={onCreatePostVote}
          createVoteLoading={createPostVoteLoading}
          createVoteError={createPostVoteError}
          onUpdateVote={onUpdatePostVote}
          updateVoteError={updatePostVoteError}
          updateVoteLoading={updatePostVoteLoading}
          onDeleteVote={onDeletePostVote}
          deleteVoteError={deletePostVoteError}
          deleteVoteLoading={deletePostVoteLoading}
          isAuthenticated={isAuthenticated}
        />
      </Box>
      <Grid item>
        <PostFirstLine 
          forum={forum}
          creatorUserName={post.creatorUserName} 
          createdOn={post.createdOn}
        />
        {showUpdateForm ? 
          <EditPost onClose={handleClose} id={post.id} title={post.title} content={post.content} onUpdatePost={onUpdatePost} /> 
        : <React.Fragment>
              <Typography component="h2" variant="h4">
                {post.title}
              </Typography>
            {post.mediaUrl &&
              <CardMedia
                className={classes.media}
                //image={post.mediaUrl}
                image={image}
                title={post.title.substring(0, 10)}
              />}
              <Typography>
                {post.content}
              </Typography>
          </React.Fragment>
        }
        
        <Grid className={classes.statsItem} item >
          <CommentIcon className={classes.statsIcon} color="primary"/>
          <Typography className={classes.margin} color="textSecondary" display="inline" variant="body2" >
            {`${post.commentsCount} Comments`}
          </Typography>
          {!isAuthenticated ? 
            null 
          : <React.Fragment>
              <EditButton show={showUpdateForm} onOpen={handleOpen} onClose={handleClose} />
              <DeleteButton id={post.id} onDelete={onDeletePost}/>
              <SavePostButton 
                postId={post.id}
                isSaved={post.isSaved}
                onCreateSavedPost={onCreateSavedPost}
                createSavedPostError={createSavedPostError}
                createSavedPostLoading={createSavedPostLoading}
                onDeleteSavedPost={onDeleteSavedPost}
                deleteSavedPostError={deleteSavedPostError}
                deleteSavedPostLoading={deleteSavedPostLoading}
              />
            </React.Fragment>}
        </Grid>
        {createCommentLoading ? 
          <Box mt={6} mb={6}><Spinner /></Box> 
        :
         <CreateComment 
            postId={post.id}
            username={username}
            onCreateComment={onCreateComment} 
            createCommentError={createCommentError} 
            createCommentLoading={createCommentLoading} 
            isAuthenticated={isAuthenticated}
          />}
        {post.commentsCount < 1 ? 
          <Box my={12} textAlign="center">
            <QuestionAnswerIcon className={classes.icon2}/>
            <Typography color="textSecondary">
              Be the first to comment.
            </Typography>
          </Box> 
          : <CommentsSorting />} 
          {createCommentLoading ? 
          <Box ml={10} mt={3} mb={3}><CircularProgress size={50} /></Box> 
        : null}
        </Grid>
    </React.Fragment>
      : <Box ml={35} mt={20} mb={20} ><Spinner /></Box>}
    </Box>
  );
}

export default React.memo(PostDetailsCard);