import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CommentIcon from '@material-ui/icons/Comment';
import Spinner from '../../Spinner/Spinner';
import EditPost from '../EditPost/EditPost';
import Voting from '../../Voting/Voting';
import SavePostButton from '../../AUI/SavePostButton';
import PostFirstLine from '../PostFirstLine/PostFirstLine';
import image from '../../../assets/images/file-20170712-14488-19lw3sc.jpg';
import EditButton from '../../AUI/EditButton';
import DeleteButton from '../../AUI/DeleteButton';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    border: "1px solid",
    borderColor: "transparent",
    '&:hover': {
      borderColor: theme.palette.common.black,
    }
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  margin: {
    marginRight: theme.spacing(1)
  },
  ml: {
    marginLeft: theme.spacing(1)
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
  },
  textColor: {
    color: '#222222',
  }
}));

const PostCard2 = props => {
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
    postVoteLoading,
    onCreatePostVote,
    onUpdatePostVote,
    onDeletePostVote,
    onCreateSavedPost,
    onDeleteSavedPost,
    savedPostLoading,
    isAuthenticated,
    onUpdatePost,
    onDeletePost,
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
          createVoteLoading={postVoteLoading}
          onUpdateVote={onUpdatePostVote}
          onDeleteVote={onDeletePostVote}
          isAuthenticated={isAuthenticated}
        />
      </Box>
      <Grid item className={classes.ml}>
        <PostFirstLine 
          forum={forum}
          creatorUserName={post.creatorUserName} 
          createdOn={post.createdOn}
        />
        {showUpdateForm ? 
          <EditPost 
            onClose={handleClose} 
            id={post.id} 
            title={post.title} 
            content={post.content} 
            onUpdatePost={onUpdatePost} 
          /> 
        : 
        <Link to={`/posts/${post.id}`}>
          <div className={classes.textColor}>
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
          </div>
        </Link>
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
                onDeleteSavedPost={onDeleteSavedPost}
              />
            </React.Fragment>}
        </Grid>
      </Grid>
    </React.Fragment>
      : <Box ml={35} mt={20} mb={20} ><Spinner /></Box>}
    </Box>
  );
}

export default React.memo(PostCard2);