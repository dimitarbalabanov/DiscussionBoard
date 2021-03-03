import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateComment from '../../Comment/CreateComment/CreateComment';
import Spinner from '../../Spinner/Spinner';
import EditPost from '../EditPost/EditPost';
import PostVoting from '../../Voting/PostVoting';
import SavePostButton from '../../AUI/SavePostButton';
import image from '../../../assets/images/file-20170712-14488-19lw3sc.jpg';
import CommentsSortingComponent from '../../SortingComponent/CommentsSortingComponent';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    //borderColor: theme.palette.primary.main,
    //border: 'none',
    boxShadow: 'none'
  },
  cardDetails: {
    flex: 1
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
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    //margin: theme.spacing(2)
  },
  textColor: {
    color: theme.palette.primary.main
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
    postsLoading,
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
    isAuthenticated
  } = props;

  console.log(props)
  return (
    <Card className={classes.card}>
      <PostVoting 
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
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardcontent}>
          {postsLoading ? <Skeleton /> : 
          <Grid className={classes.statsItem} item >
            <Typography color="textSecondary" display="inline" variant="body2" >
            <Link component={RouterLink} to={"/forums/" + post.forumId}><strong className={classes.textColor}>{post.forumTitle}</strong></Link> posted by <Link component={RouterLink} to={"/users/" + post.creatorUserName}><strong className={classes.textColor}>{post.creatorUserName}</strong></Link>
            </Typography>
          </Grid>}
          {showUpdateForm ? <EditPost onClose={handleClose} title={post.title} content={post.content}/> : 
            <React.Fragment>
              <Grid className={classes.statsItem} item >
              <Typography component="h2" variant="h4">
              {postsLoading ? <Skeleton /> : post.title}
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
                {postsLoading ? <Skeleton /> : post.content}
              </Typography>
            </Grid>
            </React.Fragment>
          }
          
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon} color="primary"/>
            <Typography className={classes.margin} color="textSecondary" display="inline" variant="body2" >
              {postsLoading ? <Skeleton /> :`${post.commentsCount} Comments`}
            </Typography>
            {showUpdateForm || !isAuthenticated ? null : <React.Fragment>
            <Button onClick={handleOpen} size="small" startIcon={<EditIcon className={classes.iconColor}/>}>
              <Typography color="textSecondary" display="inline" variant="body2">
                Edit
              </Typography>
            </Button>
              <Button size="small" startIcon={<DeleteIcon className={classes.iconColor}/>}>
                <Typography color="textSecondary" display="inline" variant="body2">
                  Delete
                </Typography> 
              </Button>
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
          {createCommentLoading 
            ? <Spinner /> 
            : <CreateComment 
            onCreateComment={onCreateComment} 
            createCommentError={createCommentError} 
            createCommentLoading={createCommentLoading} 
            postId={post.id}
            isAuthenticated={isAuthenticated}
            /> 
          }
          <CommentsSortingComponent />
          <Divider className={classes.divider}/>
          {post.commentsCount === 0 ? 
         // <Grid className={classes.statsItem} item >
         <Box my={12}
          //alignItems="center"
          //justifyContent="center"
          //alignSelf="flex-end"
          textAlign="center"
          >
              <QuestionAnswerIcon className={classes.icon2}/>
              <Typography color="textSecondary">
                Be the first to comment.
              </Typography>
            </Box> 
            //</Grid>
            : null}
        </CardContent>
      </div>
    </Card>
  );
}

export default PostDetailsCard;