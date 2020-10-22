import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConvertToRelativeTime from '../../../utils/dateConvertor';
import CreateComment from '../../Comment/CreateComment/CreateComment';
import Spinner from '../../Spinner/Spinner';
import EditPost from '../EditPost/EditPost';

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
    margin: theme.spacing(2)
  },
  textColor: {
    color: theme.palette.primary.main
  },
  iconColor: {
    color: theme.palette.text.secondary,
  },
  margin: {
    marginRight: theme.spacing(1)
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
    onCreateComment,
    createCommentLoading,
    createCommentError,
    isAuthenticated
  } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardcontent}>
          {postsLoading ? <Skeleton /> : 
          <Grid className={classes.statsItem} item >
            <Typography color="textSecondary" display="inline" variant="body2" >
              <strong className={classes.textColor}>{post.forumTitle}</strong> posted {ConvertToRelativeTime(post.createdOn)} by <strong className={classes.textColor}>{post.creatorUserName}</strong>
            </Typography>
          </Grid>}
          {showUpdateForm ? <EditPost onClose={handleClose} title={post.title} content={post.content}/> : 
            <React.Fragment>
              <Grid className={classes.statsItem} item >
              <Typography component="h2" variant="h4">
              {postsLoading ? <Skeleton /> : post.title}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item >
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
              <Button onClick={() => {}} size="small" startIcon={<DeleteIcon className={classes.iconColor}/>}>
                <Typography color="textSecondary" display="inline" variant="body2">
                  Delete
                </Typography> 
              </Button></React.Fragment>}
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
        </CardContent>
      </div>
    </Card>
  );
}

export default PostDetailsCard;