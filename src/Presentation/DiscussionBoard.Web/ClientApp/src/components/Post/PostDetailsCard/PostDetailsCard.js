import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { reach } from 'yup';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    //borderColor: theme.palette.primary.main,
    //border: 'none',
    //boxShadow: 'none'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  iconColor: {
    color: theme.palette.text.secondary,
  },
  margin: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 140,
    paddingTop: '70.25%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  icon2: {
    color: theme.palette.text.secondary,
    fontSize: '60px'
  },
  voting: {
    backgroundColor: theme.palette.primary.main 
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
    username
  } = props;

  return (
  <Box elevation={0} className={classes.card}>
    {!postLoading && post !== undefined ?
    <React.Fragment>
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
    <Box>
    <Grid item>
      <PostFirstLine 
        forum={forum}
        creatorUserName={post.creatorUserName} 
        createdOn={post.createdOn}
      />
      {showUpdateForm ? 
        <EditPost onClose={handleClose} title={post.title} content={post.content}/> 
      : <React.Fragment>
          <Grid className={classes.statsItem} item >
            <Typography component="h2" variant="h4">
              {post.title}
            </Typography>
          </Grid>
          {post.mediaUrl &&
            <CardMedia
              className={classes.media}
              //image={post.mediaUrl}
              image={image}
              title={post.title.substring(0, 10)}
            />}
          <Grid className={classes.statsItem} item>
            <Typography>
              {post.content}
            </Typography>
          </Grid>
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
            <DeleteButton />
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
        <Spinner /> 
      : <CreateComment 
          postId={post.id}
          username={username}
          onCreateComment={onCreateComment} 
          createCommentError={createCommentError} 
          createCommentLoading={createCommentLoading} 
          isAuthenticated={isAuthenticated}
        />}
      <CommentsSorting />
      {post.commentsCount < 1 ? 
        <Box my={12} textAlign="center">
          <QuestionAnswerIcon className={classes.icon2}/>
          <Typography color="textSecondary">
            Be the first to comment.
          </Typography>
        </Box> : null} 
      </Grid>
    </Box>
      </React.Fragment>
      : <Box m={20}><Spinner /></Box>}
    </Box>
  );
}

export default React.memo(PostDetailsCard);
//export default PostDetailsCard;