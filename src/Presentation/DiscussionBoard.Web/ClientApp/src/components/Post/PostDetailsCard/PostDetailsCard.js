import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import CommentIcon from '@material-ui/icons/Comment';
import ConvertToRelativeTime from '../../../utils/dateConvertor';
import CreateComment from '../../Comment/CreateComment/CreateComment';
import CommentCard from '../../Comment/CommentCard/CommentCard';
import Spinner from '../../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderColor: theme.palette.primary.main,
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
}));

const PostDetailsCard = props => {
  const classes = useStyles();
  const { post,
    postsLoading,
    comments,
    commentsLoading,
    onCreateComment,
    createCommentLoading,
    createCommentError,
    onDeleteComment,
    deleteCommentLoading,
    deleteCommentId
  } = props;

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardcontent}>
          {postsLoading ? <Skeleton /> : 
          <Grid className={classes.statsItem} item >
            <Typography color="textSecondary" display="inline" variant="body2" >
              <strong className={classes.textColor}>{post.forumTitle}</strong> posted {ConvertToRelativeTime(post.createdOn)} by <strong className={classes.textColor}>{post.creatorUserName}</strong>
            </Typography>
          </Grid>}
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
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon} color="primary"/>
            <Typography color="textSecondary" display="inline" variant="body2" >
              {postsLoading ? <Skeleton /> :`${post.commentsCount} Comments`}
            </Typography>
          </Grid>
          {createCommentLoading 
            ? <Spinner /> 
            : <CreateComment 
                onCreateComment={onCreateComment} 
                createCommentError={createCommentError} 
                createCommentLoading={createCommentLoading} 
                postId={post.id}
              /> 
          }
          {commentsLoading 
            ? null 
            : comments.map(comment => 
              <CommentCard 
                key={comment.id}
                comment={comment}
                onDeleteComment={onDeleteComment}
                deleteCommentLoading={deleteCommentLoading}
                deleteCommentId={deleteCommentId}
              />)
          }
        </CardContent>
      </div>
    </Card>
  );
}

export default PostDetailsCard;